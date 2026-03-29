import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const annonce = await prisma.annonce.findUnique({
      where: { id },
      include: {
        vendeur: {
          select: {
            nom: true,
            prenom: true,
            telephone: true,
            ville: true,
          }
        }
      }
    })

    if (!annonce) {
      return NextResponse.json(
        { error: 'Annonce introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({ annonce })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.annonce.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Annonce supprimée' })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}