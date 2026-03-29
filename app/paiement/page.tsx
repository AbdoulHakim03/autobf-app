'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PaiementContent() {
  const searchParams = useSearchParams()
  const annonceId = searchParams.get('annonceId')
  const montant = searchParams.get('montant')
  const marque = searchParams.get('marque')
  const modele = searchParams.get('modele')

  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const handlePaiement = async () => {
    setLoading(true)
    setErreur('')

    try {
      const res = await fetch('/api/paiement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annonceId,
          montant: parseInt(montant || '0'),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Rediriger vers la page de paiement FedaPay
        window.location.href = `https://sandbox-checkout.fedapay.com/?token=${data.token}`
      } else {
        setErreur(data.error || 'Une erreur est survenue')
      }
    } catch {
      setErreur('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const fraisEscrow = Math.round(parseInt(montant || '0') * 0.025)
  const montantTotal = parseInt(montant || '0') + fraisEscrow

  return (
    <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4 py-20">

 

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-bold text-[#1A1208] mb-2">Paiement sécurisé</h1>
          <p className="text-sm text-[#8A7A65]">Votre argent est protégé jusqu'à réception du véhicule</p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-md p-6 mb-4">
          <h2 className="font-bold text-lg text-[#1A1208] mb-4">
            🚗 {marque} {modele}
          </h2>

          <div className="flex flex-col gap-2 mb-5">
            <div className="flex justify-between text-sm text-[#8A7A65] py-2 border-b border-black/5">
              <span>Prix du véhicule</span>
              <span className="font-medium text-[#1A1208]">{parseInt(montant || '0').toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-sm text-[#8A7A65] py-2 border-b border-black/5">
              <span>Frais escrow (2.5%)</span>
              <span className="font-medium text-[#1A1208]">{fraisEscrow.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between font-bold text-[#1A1208] py-2 text-lg">
              <span>Total à payer</span>
              <span>{montantTotal.toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className="bg-[#F5F0E8] rounded-xl p-4 mb-5 border border-black/5">
            <div className="text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-3">
              Méthodes de paiement acceptées
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Orange Money', 'Wave', 'Moov', 'Visa', 'Mastercard'].map(m => (
                <span key={m} className="px-3 py-1 rounded-lg bg-white border border-black/10 text-xs font-semibold text-[#3D3020]">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {erreur && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {erreur}
            </div>
          )}

          <button
            onClick={handlePaiement}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-base hover:bg-[#A86520] transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Redirection en cours...' : `🔒 Payer ${montantTotal.toLocaleString()} FCFA`}
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#C17B2E]/10 to-[#2A7A4B]/10 rounded-2xl border border-[#C17B2E]/20 p-5">
          <div className="font-bold text-[#C17B2E] mb-3">🛡️ Garantie AutoBF</div>
          <div className="flex flex-col gap-2">
            {[
              'Ton argent est bloqué jusqu\'à réception du véhicule',
              'Si le véhicule ne correspond pas, tu es remboursé',
              'Contrat PDF signé automatiquement',
              'Support AutoBF disponible 7j/7',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[#8A7A65]">
                <span className="text-[#2A7A4B] font-bold mt-0.5">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}

export default function Paiement() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center"><p className="text-[#8A7A65]">Chargement...</p></div>}>
      <PaiementContent />
    </Suspense>
  )
}