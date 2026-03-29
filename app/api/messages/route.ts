import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value
    if (!token) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
    const decoded = jwt.verify(token, SECRET) as { id: string }

    const { searchParams } = new URL(request.url)
    const avecUserId = searchParams.get('avecUserId')

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { envoyeurId: decoded.id, destinataireId: avecUserId || undefined },
          { envoyeurId: avecUserId || undefined, destinataireId: decoded.id },
        ]
      },
      include: {
        envoyeur: { select: { nom: true, prenom: true } }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json({ messages })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value
    if (!token) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
    const decoded = jwt.verify(token, SECRET) as { id: string }

    const body = await request.json()
    const { destinataireId, contenu, annonceId } = body

    if (!destinataireId || !contenu) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        contenu,
        envoyeurId: decoded.id,
        destinataireId,
        annonceId: annonceId || null,
      }
    })

    return NextResponse.json({ message }, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}