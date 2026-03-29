'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type Annonce = {
  id: string
  marque: string
  modele: string
  annee: number
  kilometrage: number
  carburant: string
  boite: string
  couleur: string
  prix: number
  ville: string
  description: string
  dedouane: boolean
  photos: string
  createdAt: string
  vendeur: {
    nom: string
    prenom: string
    telephone: string
    ville: string
  }
}

export default function Detail() {
  const { id } = useParams()
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [loading, setLoading] = useState(true)
  const [photoActive, setPhotoActive] = useState(0)

  useEffect(() => {
    if (id) fetchAnnonce()
  }, [id])

  const fetchAnnonce = async () => {
    try {
      const res = await fetch(`/api/annonces/${id}`)
      const data = await res.json()
      setAnnonce(data.annonce)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <p className="text-[#8A7A65]">Chargement...</p>
    </div>
  )

  if (!annonce) return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <p className="text-[#8A7A65]">Annonce introuvable</p>
    </div>
  )

  const photos = annonce.photos ? JSON.parse(annonce.photos) : []
  const lienPaiement = `/paiement?annonceId=${annonce.id}&montant=${annonce.prix}&marque=${annonce.marque}&modele=${annonce.modele}`

  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] bg-[#F5F0E8]/90 backdrop-blur-md border-b border-black/10">
        <a href="/" className="font-bold text-xl text-[#1A1208]">
          Auto<span className="text-[#C17B2E]">BF</span>
        </a>
        <a href="/search" className="text-sm text-[#8A7A65] hover:text-[#C17B2E] transition-colors">
          ← Retour aux annonces
        </a>
      </nav>

      <div className="pt-24 px-[5%] pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        <div className="lg:col-span-2">

          <div className="mb-6">
            {photos.length > 0 ? (
              <div>
                <img
                  src={photos[photoActive]}
                  alt={annonce.marque + ' ' + annonce.modele}
                  className="w-full h-80 object-cover rounded-2xl border border-black/10 shadow-sm mb-3"
                />
                {photos.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {photos.map((url: string, i: number) => (
                      <img
                        key={i}
                        src={url}
                        alt={'photo ' + (i+1)}
                        onClick={() => setPhotoActive(i)}
                        className={'w-full h-16 object-cover rounded-xl cursor-pointer border-2 transition-all ' + (photoActive === i ? 'border-[#C17B2E]' : 'border-transparent hover:border-[#C17B2E]/50')}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#EDE8DF] rounded-2xl h-80 flex items-center justify-center text-8xl border border-black/10 shadow-sm">
                🚗
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {annonce.dedouane && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#C17B2E]/10 text-[#C17B2E] border border-[#C17B2E]/25">
                  🛃 Dédouané
                </span>
              )}
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#3B6CC5]/10 text-[#3B6CC5] border border-[#3B6CC5]/25">
                ✓ Annonce vérifiée
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1208] mb-2" style={{letterSpacing: '-1px'}}>
              {annonce.marque} {annonce.modele} {annonce.annee}
            </h1>
            <p className="text-[#8A7A65]">
              {annonce.carburant} · {annonce.boite} · {annonce.couleur}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 py-5 border-t border-b border-black/10 mb-6">
            {[
              { label: 'Année', value: annonce.annee },
              { label: 'Kilométrage', value: annonce.kilometrage.toLocaleString() + ' km' },
              { label: 'Carburant', value: annonce.carburant },
              { label: 'Boîte', value: annonce.boite },
              { label: 'Couleur', value: annonce.couleur },
              { label: 'Ville', value: annonce.ville },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xs text-[#8A7A65] uppercase tracking-wider mb-1">{s.label}</div>
                <div className="font-semibold text-[#1A1208]">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm">
            <h3 className="font-bold text-lg text-[#1A1208] mb-3">Description du vendeur</h3>
            <p className="text-sm text-[#8A7A65] leading-relaxed">{annonce.description}</p>
          </div>

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">

            <div className="bg-white rounded-2xl border border-black/10 p-6 mb-4 shadow-md">
              <div className="text-4xl font-bold text-[#1A1208] mb-4" style={{letterSpacing: '-1.5px'}}>
                {annonce.prix.toLocaleString()} <span className="text-base font-normal text-[#8A7A65]">FCFA</span>
              </div>
              <div className="flex flex-col gap-3">
                <a href={lienPaiement} className="block w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-center hover:bg-[#A86520] transition-all shadow-lg">
                  🔒 Acheter via Escrow
                </a>
                <button className="w-full py-3 rounded-xl border border-black/10 text-[#3D3020] font-semibold text-sm hover:border-[#C17B2E] hover:text-[#C17B2E] transition-all">
                  💬 Contacter le vendeur
                </button>
                <button className="w-full py-3 rounded-xl bg-[#2A7A4B]/10 text-[#2A7A4B] font-semibold text-sm border border-[#2A7A4B]/25 hover:bg-[#2A7A4B]/20 transition-all">
                  📅 Planifier une visite
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm">
              <div className="text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-4">Vendeur</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-lg">
                  {annonce.vendeur.nom[0]}
                </div>
                <div>
                  <div className="font-bold text-[#1A1208]">{annonce.vendeur.nom} {annonce.vendeur.prenom}</div>
                  <div className="text-xs text-[#8A7A65]">📍 {annonce.vendeur.ville}</div>
                </div>
              </div>
              <div className="text-sm text-[#8A7A65]">
                📞 {annonce.vendeur.telephone}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}