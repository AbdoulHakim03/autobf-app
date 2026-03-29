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

    if (!token) {
      return NextResponse.json(
        { error: 'Non connecté' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, SECRET) as { id: string, nom: string, prenom: string, email: string }

    const annonces = await prisma.annonce.findMany({
      where: { vendeurId: decoded.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      user: {
        nom: decoded.nom,
        prenom: decoded.prenom,
        email: decoded.email,
      },
      annonces
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}