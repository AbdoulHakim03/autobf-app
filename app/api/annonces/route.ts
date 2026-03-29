import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const marque = searchParams.get('marque')
    const ville = searchParams.get('ville')
    const prixMax = searchParams.get('prixMax')

    const annonces = await prisma.annonce.findMany({
      where: {
        ...(marque && { marque }),
        ...(ville && { ville }),
        ...(prixMax && { prix: { lte: parseInt(prixMax) } }),
        statut: 'en_attente',
      },
      include: {
        vendeur: {
          select: {
            nom: true,
            prenom: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ annonces })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}