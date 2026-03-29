'use client'

import { useState, useEffect } from 'react'

type User = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  ville: string
  verifie: boolean
  role: string
  createdAt: string
  annonces: { id: string }[]
}

type Annonce = {
  id: string
  marque: string
  modele: string
  annee: number
  prix: number
  ville: string
  statut: string
  createdAt: string
  vendeur: {
    nom: string
    prenom: string
  }
}

type Stats = {
  totalUsers: number
  totalAnnonces: number
  totalMessages: number
}

export default function Admin() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [onglet, setOnglet] = useState<'stats' | 'users' | 'annonces'>('stats')
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    fetchAdmin()
  }, [])

  const fetchAdmin = async () => {
    try {
      const res = await fetch('/api/admin')
      if (res.status === 401 || res.status === 403) {
        setErreur('Accès refusé — réservé aux administrateurs')
        return
      }
      const data = await res.json()
      setStats(data.stats)
      setUsers(data.users)
      setAnnonces(data.annonces)
    } catch (error) {
      console.error(error)
      setErreur('Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  const supprimerAnnonce = async (id: string) => {
    if (!confirm('Supprimer cette annonce ?')) return
    await fetch(`/api/annonces/${id}`, { method: 'DELETE' })
    setAnnonces(annonces.filter(a => a.id !== id))
  }

  const verifierUser = async (id: string) => {
    await fetch(`/api/admin/users/${id}/verifier`, { method: 'POST' })
    setUsers(users.map(u => u.id === id ? { ...u, verifie: true } : u))
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <p className="text-[#8A7A65]">Chargement...</p>
    </div>
  )

  if (erreur) return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🔒</div>
        <p className="font-bold text-xl text-[#1A1208] mb-2">Accès refusé</p>
        <p className="text-[#8A7A65]">{erreur}</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="px-[5%] py-8 max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1208] mb-1">Administration AutoBF</h1>
          <p className="text-[#8A7A65]">Tableau de bord administrateur</p>
        </div>

        {/* ONGLETS */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-black/10 w-fit">
          {[
            { key: 'stats', label: '📊 Statistiques' },
            { key: 'users', label: '👥 Utilisateurs' },
            { key: 'annonces', label: '🚗 Annonces' },
          ].map(o => (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key as 'stats' | 'users' | 'annonces')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                onglet === o.key
                  ? 'bg-[#C17B2E] text-white shadow-sm'
                  : 'text-[#8A7A65] hover:text-[#1A1208]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* STATS */}
        {onglet === 'stats' && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Utilisateurs inscrits', value: stats.totalUsers, icon: '👥', color: 'text-[#3B6CC5]' },
              { label: 'Annonces publiées', value: stats.totalAnnonces, icon: '🚗', color: 'text-[#C17B2E]' },
              { label: 'Messages échangés', value: stats.totalMessages, icon: '💬', color: 'text-[#2A7A4B]' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className={`text-4xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-sm text-[#8A7A65]">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* UTILISATEURS */}
        {onglet === 'users' && (
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-black/10">
              <h2 className="font-bold text-lg text-[#1A1208]">Utilisateurs ({users.length})</h2>
            </div>
            <div className="divide-y divide-black/5">
              {users.map(user => (
                <div key={user.id} className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold shrink-0">
                    {user.nom[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1A1208]">{user.nom} {user.prenom}</div>
                    <div className="text-sm text-[#8A7A65]">{user.email} · {user.telephone}</div>
                    <div className="text-xs text-[#8A7A65]">{user.ville} · {user.annonces.length} annonce(s)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.verifie ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2A7A4B]/10 text-[#2A7A4B] border border-[#2A7A4B]/25">
                        ✓ Vérifié
                      </span>
                    ) : (
                      <button
                        onClick={() => verifierUser(user.id)}
                        className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#D4870A]/10 text-[#D4870A] border border-[#D4870A]/25 hover:bg-[#D4870A]/20 transition-all"
                      >
                        Vérifier
                      </button>
                    )}
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-[#3B6CC5]/10 text-[#3B6CC5] border border-[#3B6CC5]/25'
                        : 'bg-[#F5F0E8] text-[#8A7A65] border border-black/10'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNONCES */}
        {onglet === 'annonces' && (
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-black/10">
              <h2 className="font-bold text-lg text-[#1A1208]">Annonces ({annonces.length})</h2>
            </div>
            <div className="divide-y divide-black/5">
              {annonces.map(annonce => (
                <div key={annonce.id} className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#EDE8DF] flex items-center justify-center text-xl shrink-0">
                    🚗
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1A1208]">{annonce.marque} {annonce.modele} {annonce.annee}</div>
                    <div className="text-sm text-[#8A7A65]">{annonce.prix.toLocaleString()} FCFA · {annonce.ville}</div>
                    <div className="text-xs text-[#8A7A65]">Vendeur : {annonce.vendeur.nom} {annonce.vendeur.prenom}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`/detail/${annonce.id}`}
                      className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5F0E8] text-[#8A7A65] border border-black/10 hover:border-[#C17B2E] hover:text-[#C17B2E] transition-all">
                      Voir
                    </a>
                    <button
                      onClick={() => supprimerAnnonce(annonce.id)}
                      className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}