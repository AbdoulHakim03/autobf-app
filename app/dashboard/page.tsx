'use client'

import { useState, useEffect } from 'react'

type Annonce = {
  id: string
  marque: string
  modele: string
  annee: number
  prix: number
  ville: string
  statut: string
  createdAt: string
  kilometrage: number
  carburant: string
}

export default function Dashboard() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{nom: string, prenom: string, email: string} | null>(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard')
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      const data = await res.json()
      setAnnonces(data.annonces || [])
      setUser(data.user)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const supprimerAnnonce = async (id: string) => {
    if (!confirm('Supprimer cette annonce ?')) return
    try {
      await fetch(`/api/annonces/${id}`, { method: 'DELETE' })
      setAnnonces(annonces.filter(a => a.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <p className="text-[#8A7A65]">Chargement...</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] bg-[#F5F0E8]/90 backdrop-blur-md border-b border-black/10">
        <a href="/" className="font-bold text-xl text-[#1A1208]">
          Auto<span className="text-[#C17B2E]">BF</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/publier" className="px-5 py-2 rounded-lg bg-[#C17B2E] text-white text-sm font-semibold">
            + Publier une annonce
          </a>
        </div>
      </nav>

      <div className="pt-24 px-[5%] pb-20 max-w-5xl mx-auto">

        {/* HEADER */}
        {user && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A1208] mb-1">
              Bonjour {user.prenom} 👋
            </h1>
            <p className="text-[#8A7A65]">{user.email}</p>
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Annonces actives', value: annonces.length, color: 'text-[#C17B2E]' },
            { label: 'Vues totales', value: '0', color: 'text-[#2A7A4B]' },
            { label: 'Messages reçus', value: '0', color: 'text-[#3B6CC5]' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm text-center">
              <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[#8A7A65] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ANNONCES */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <h2 className="font-bold text-lg text-[#1A1208]">Mes annonces</h2>
            <a href="/publier" className="text-sm text-[#C17B2E] font-semibold hover:underline">
              + Nouvelle annonce
            </a>
          </div>

          {annonces.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🚗</div>
              <div className="font-bold text-lg text-[#1A1208] mb-2">Aucune annonce publiée</div>
              <p className="text-[#8A7A65] mb-6">Publie ta première annonce maintenant</p>
              <a href="/publier" className="px-6 py-3 rounded-xl bg-[#C17B2E] text-white font-semibold hover:bg-[#A86520] transition-all">
                Publier une annonce
              </a>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {annonces.map((annonce) => (
                <div key={annonce.id} className="flex items-center gap-4 p-5 hover:bg-[#F5F0E8]/50 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-[#EDE8DF] flex items-center justify-center text-2xl shrink-0">
                    🚗
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1A1208]">
                      {annonce.marque} {annonce.modele} {annonce.annee}
                    </div>
                    <div className="text-sm text-[#8A7A65]">
                      {annonce.kilometrage.toLocaleString()} km · {annonce.carburant} · {annonce.ville}
                    </div>
                    <div className="text-sm font-bold text-[#C17B2E] mt-1">
                      {annonce.prix.toLocaleString()} FCFA
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`/detail/${annonce.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#F5F0E8] text-[#3D3020] text-xs font-semibold border border-black/10 hover:border-[#C17B2E] transition-all">
                      Voir
                    </a>
                    <button onClick={() => supprimerAnnonce(annonce.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold border border-red-100 hover:bg-red-100 transition-all">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}