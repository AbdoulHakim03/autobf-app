import { NextResponse } from 'next/server'
import { FedaPay, Transaction } from 'fedapay'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

FedaPay.setApiKey('sk_sandbox_Uv50gtUJfDUr7dVXykvGpJRZ')
FedaPay.setEnvironment('sandbox')

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Tu dois être connecté pour effectuer un paiement' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, SECRET) as { id: string, email: string, nom: string, prenom: string }

    const body = await request.json()
    const { annonceId, montant } = body

    // Vérifier que l'annonce existe
    const annonce = await prisma.annonce.findUnique({
      where: { id: annonceId },
      include: { vendeur: true }
    })

    if (!annonce) {
      return NextResponse.json(
        { error: 'Annonce introuvable' },
        { status: 404 }
      )
    }

    // Calculer les frais escrow (2.5%)
    const fraisEscrow = Math.round(montant * 0.025)
    const montantTotal = montant + fraisEscrow

    // Créer la transaction FedaPay
    const transaction = await Transaction.create({
      description: `Achat ${annonce.marque} ${annonce.modele} ${annonce.annee} via AutoBF`,
      amount: montantTotal,
      currency: { iso: 'XOF' },
      callback_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/paiement/callback`,
      customer: {
        firstname: decoded.prenom,
        lastname: decoded.nom,
        email: decoded.email,
      },
    })

    // Générer le token de paiement
    const token_paiement = await transaction.generateToken()

    return NextResponse.json({
      token: token_paiement.token,
      montant: montantTotal,
      fraisEscrow,
      annonceId,
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}