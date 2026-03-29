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
    const decoded = jwt.verify(token, SECRET) as { id: string }

    // Récupérer tous les messages de l'utilisateur
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { envoyeurId: decoded.id },
          { destinataireId: decoded.id },
        ]
      },
      include: {
        envoyeur: { select: { id: true, nom: true, prenom: true } },
        destinataire: { select: { id: true, nom: true, prenom: true } },
      },
      orderBy: { createdAt: 'desc' }
    })

    // Grouper par conversation
    const conversationsMap = new Map()

    messages.forEach(msg => {
      const autreUser = msg.envoyeurId === decoded.id ? msg.destinataire : msg.envoyeur
      const key = autreUser.id

      if (!conversationsMap.has(key)) {
        conversationsMap.set(key, {
          userId: autreUser.id,
          nom: autreUser.nom,
          prenom: autreUser.prenom,
          dernierMessage: msg.contenu,
          date: msg.createdAt,
        })
      }
    })

    const conversations = Array.from(conversationsMap.values())

    return NextResponse.json({ conversations })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}