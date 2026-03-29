import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value
    if (!token) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const decoded = jwt.verify(token, SECRET) as { id: string, role: string }
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const [users, annonces, totalMessages] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { annonces: { select: { id: true } } }
      }),
      prisma.annonce.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          vendeur: { select: { nom: true, prenom: true } }
        }
      }),
      prisma.message.count()
    ])

    return NextResponse.json({
      stats: {
        totalUsers: users.length,
        totalAnnonces: annonces.length,
        totalMessages,
      },
      users,
      annonces,
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}