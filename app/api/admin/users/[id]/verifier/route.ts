import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value
    if (!token) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const decoded = jwt.verify(token, SECRET) as { role: string }
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const { id } = await context.params

    await prisma.user.update({
      where: { id },
      data: { verifie: true }
    })

    return NextResponse.json({ message: 'Utilisateur vérifié' })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}