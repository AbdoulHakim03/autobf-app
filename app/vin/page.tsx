'use client'

import { useState } from 'react'

type ResultatVIN = {
  origine: string
  vin: string
  marque?: string
  modele?: string
  annee?: string
  pays?: string
  carburant?: string
  typeVehicule?: string
  cylindres?: string
  source?: string
  gratuit?: boolean
  message?: string
  recommandation?: string
  lienCarVertical?: string
}

export default function VinPage() {
  const [vin, setVin] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultat, setResultat] = useState<ResultatVIN | null>(null)
  const [erreur, setErreur] = useState('')

  const handleVerifier = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    setResultat(null)

    try {
      const res = await fetch('/api/vin?vin=' + vin.trim().toUpperCase())
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error || 'Erreur lors de la vérification')
      } else {
        setResultat(data)
      }
    } catch {
      setErreur('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const premierCaractere = vin[0]?.toUpperCase()
  const origineDetectee = ['1','2','3','4','5'].includes(premierCaractere)
    ? '🇺🇸 Véhicule américain — vérification gratuite'
    : ['S','V','W','X','Z'].includes(premierCaractere)
    ? '🇪🇺 Véhicule européen — rapport carVertical recommandé'
    : vin.length > 0
    ? '🌍 Origine à déterminer'
    : ''

  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="max-w-3xl mx-auto px-[5%] py-16">

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C17B2E]/10 border border-[#C17B2E]/20 text-[#C17B2E] text-xs font-bold uppercase tracking-wider mb-4">
            📋 Vérification VIN
          </div>
          <h1 className="text-4xl font-bold text-[#1A1208] mb-3" style={{letterSpacing: '-1px'}}>
            Vérifiez l'historique<br />
            de votre <span className="text-[#C17B2E] italic">véhicule</span>
          </h1>
          <p className="text-[#8A7A65] leading-relaxed">
            Entrez le numéro VIN (17 caractères) pour obtenir les informations
            officielles sur le véhicule. Gratuit pour les véhicules américains.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm mb-6">
          <form onSubmit={handleVerifier} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Numéro VIN (17 caractères)
              </label>
              <input
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="Ex: 1HGBH41JXMN109186"
                maxLength={17}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] font-mono text-lg outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all tracking-widest"
              />
              <div className="flex justify-between mt-2">
                {origineDetectee && (
                  <span className="text-xs text-[#C17B2E] font-medium">{origineDetectee}</span>
                )}
                <span className="text-xs text-[#8A7A65] ml-auto">{vin.length}/17</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || vin.length !== 17}
              className="w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-base hover:bg-[#A86520] transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Vérification en cours...' : '🔍 Vérifier ce VIN'}
            </button>
          </form>

          {erreur && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {erreur}
            </div>
          )}
        </div>

        {resultat && resultat.origine === 'USA' && (
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            <div className="bg-[#2A7A4B] px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-bold text-white">VIN vérifié — Véhicule américain</div>
                <div className="text-xs text-green-200">{resultat.source}</div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Marque', value: resultat.marque },
                  { label: 'Modèle', value: resultat.modele },
                  { label: 'Année', value: resultat.annee },
                  { label: 'Pays de fabrication', value: resultat.pays },
                  { label: 'Carburant', value: resultat.carburant },
                  { label: 'Type de véhicule', value: resultat.typeVehicule },
                  { label: 'Cylindres', value: resultat.cylindres },
                  { label: 'VIN', value: resultat.vin },
                ].filter(item => item.value && item.value !== 'Not Applicable').map((item) => (
                  <div key={item.label} className="bg-[#F5F0E8] rounded-xl p-3">
                    <div className="text-xs text-[#8A7A65] uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="font-semibold text-[#1A1208] text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-[#2A7A4B]/10 border border-[#2A7A4B]/25 text-sm text-[#2A7A4B]">
                ✓ Ces informations proviennent de la base de données officielle du gouvernement américain (NHTSA). Vérification gratuite.
              </div>
            </div>
          </div>
        )}

        {resultat && resultat.origine === 'Europe' && (
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            <div className="bg-[#3B6CC5] px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">🇪🇺</span>
              <div>
                <div className="font-bold text-white">Véhicule européen détecté</div>
                <div className="text-xs text-blue-200">Rapport complet disponible via carVertical</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[#8A7A65] mb-4 leading-relaxed">{resultat.message}</p>
              <p className="text-[#8A7A65] mb-6 leading-relaxed">{resultat.recommandation}</p>

              <a
                href={resultat.lienCarVertical}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-xl bg-[#3B6CC5] text-white font-bold text-center hover:bg-[#2A5BA5] transition-all shadow-lg"
              >
                📋 Obtenir le rapport carVertical →
              </a>

            </div>
          </div>
        )}

        {resultat && resultat.origine === 'Autre' && (
          <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
            <div className="text-4xl mb-3">🌍</div>
            <p className="font-bold text-[#1A1208] mb-2">Origine non identifiée</p>
            <p className="text-[#8A7A65] text-sm">{resultat.message}</p>
            <p className="text-[#8A7A65] text-sm mt-2">{resultat.recommandation}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm">
            <div className="text-2xl mb-3">🇺🇸</div>
            <h3 className="font-bold text-[#1A1208] mb-2">Véhicules américains</h3>
            <p className="text-xs text-[#8A7A65] leading-relaxed">
              VIN commençant par 1, 2, 3, 4 ou 5. Vérification gratuite via la base officielle NHTSA du gouvernement américain.
            </p>
            <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#2A7A4B]/10 text-[#2A7A4B] text-xs font-bold w-fit">
              ✓ Gratuit
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm">
            <div className="text-2xl mb-3">🇪🇺</div>
            <h3 className="font-bold text-[#1A1208] mb-2">Véhicules européens</h3>
            <p className="text-xs text-[#8A7A65] leading-relaxed">
              VIN commençant par S, V, W, X ou Z. Rapport complet via carVertical incluant accidents, kilométrage et historique.
            </p>
            <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#D4870A]/10 text-[#D4870A] text-xs font-bold w-fit">
              💳 Payant (~2€)
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}