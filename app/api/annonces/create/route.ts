import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Tu dois être connecté pour publier une annonce' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, SECRET) as { id: string }

    const body = await request.json()
    const {
      marque, modele, annee, kilometrage,
      carburant, boite, couleur, prix,
      ville, description, dedouane, photos
    } = body

    if (!marque || !modele || !annee || !kilometrage || !carburant || !boite || !couleur || !prix || !ville || !description) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    const annonce = await prisma.annonce.create({
      data: {
        marque,
        modele,
        annee: parseInt(annee),
        kilometrage: parseInt(kilometrage),
        carburant,
        boite,
        couleur,
        prix: parseInt(prix),
        ville,
        description,
        dedouane: dedouane || false,
        photos: photos || '[]',
        vendeurId: decoded.id,
      }
    })

    return NextResponse.json({
      message: 'Annonce créée avec succès',
      annonce
    }, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}