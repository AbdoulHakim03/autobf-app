'use client'

import { useState, useEffect } from 'react'

const MARQUES = [
  'Toyota', 'Kia', 'Hyundai', 'Mercedes', 'Peugeot', 'Nissan', 'Honda',
  'Renault', 'Volkswagen', 'BMW', 'Audi', 'Ford', 'Opel', 'Mitsubishi',
  'Suzuki', 'Mazda', 'Isuzu', 'Land Rover', 'Lexus', 'Infiniti', 'Jeep',
  'Chevrolet', 'Fiat', 'Citroën', 'Dacia', 'Changan', 'BYD', 'Subaru',
  'Volvo', 'Porsche', 'Acura', 'Alfa Romeo', 'Chrysler', 'Dodge', 'GMC',
  'Hummer', 'Jaguar', 'Lincoln', 'Maserati', 'Mercury', 'Mini', 'Pontiac',
  'Ram', 'Seat', 'Skoda', 'Smart', 'Ssangyong', 'Tesla', 'Haval', 'Autre'
]

const VILLES = [
  'Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya',
  'Kaya', 'Tenkodogo', "Fada N'Gourma", 'Dédougou', 'Manga', 'Gaoua',
  'Dori', 'Ziniaré', 'Léo', 'Diébougou', 'Kongoussi', 'Réo', 'Yako',
  'Titao', 'Nouna'
]

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
  }
}

export default function Search() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [loading, setLoading] = useState(true)
  const [marque, setMarque] = useState('')
  const [ville, setVille] = useState('')
  const [prixMax, setPrixMax] = useState(30000000)

  useEffect(() => {
    fetchAnnonces()
  }, [])

  const fetchAnnonces = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (marque) params.append('marque', marque)
      if (ville) params.append('ville', ville)
      if (prixMax < 30000000) params.append('prixMax', prixMax.toString())

      const res = await fetch(`/api/annonces?${params}`)
      const data = await res.json()
      setAnnonces(data.annonces || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchAnnonces()
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] bg-[#F5F0E8]/90 backdrop-blur-md border-b border-black/10">
        <a href="/" className="font-bold text-xl text-[#1A1208]">
          Auto<span className="text-[#C17B2E]">BF</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/publier" className="px-5 py-2 rounded-lg bg-[#C17B2E] text-white text-sm font-semibold">
            Publier une annonce
          </a>
        </div>
      </nav>

      <div className="pt-[86px] bg-white border-b border-black/10 shadow-sm">
        <div className="px-[5%] py-4 max-w-4xl">
          <form onSubmit={handleSearch} className="flex gap-3 items-end flex-wrap">

            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Marque</label>
              <select value={marque} onChange={(e) => setMarque(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                <option value="">Toutes les marques</option>
                {MARQUES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Ville</label>
              <select value={ville} onChange={(e) => setVille(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                <option value="">Toutes les villes</option>
                {VILLES.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Budget max : {prixMax.toLocaleString()} FCFA
              </label>
              <input type="range" min="500000" max="30000000" step="500000"
                value={prixMax} onChange={(e) => setPrixMax(parseInt(e.target.value))}
                className="w-full accent-[#C17B2E]" />
            </div>

            <button type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C17B2E] text-white font-semibold text-sm hover:bg-[#A86520] transition-all shadow-md whitespace-nowrap">
              🔍 Rechercher
            </button>

          </form>
        </div>
      </div>

      <div className="px-[5%] py-8">

        <div className="mb-6 text-sm text-[#8A7A65]">
          <span className="font-bold text-[#1A1208]">{annonces.length} véhicule{annonces.length > 1 ? 's' : ''}</span> disponible{annonces.length > 1 ? 's' : ''}
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="text-[#8A7A65]">Chargement des annonces...</div>
          </div>
        )}

        {!loading && annonces.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🚗</div>
            <div className="font-bold text-xl text-[#1A1208] mb-2">Aucune annonce trouvée</div>
            <p className="text-[#8A7A65] mb-6">Sois le premier à publier une annonce !</p>
            <a href="/publier" className="px-6 py-3 rounded-xl bg-[#C17B2E] text-white font-semibold hover:bg-[#A86520] transition-all">
              Publier une annonce
            </a>
          </div>
        )}

        {!loading && annonces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {annonces.map((annonce) => (
              <a href={`/detail/${annonce.id}`} key={annonce.id}
                className="bg-white rounded-2xl border border-black/10 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[#C17B2E] transition-all cursor-pointer block">
                <div className="h-44 bg-[#EDE8DF] relative overflow-hidden">
                  {annonce.photos && JSON.parse(annonce.photos).length > 0 ? (
                    <img
                      src={JSON.parse(annonce.photos)[0]}
                      alt={`${annonce.marque} ${annonce.modele}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">🚗</div>
                  )}
                  {annonce.dedouane && (
                    <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-[#C17B2E]/10 text-[#C17B2E] border border-[#C17B2E]/25">
                      🛃 Dédouané
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-bold text-[#1A1208] text-lg mb-2">
                    {annonce.marque} {annonce.modele} {annonce.annee}
                  </div>
                  <div className="flex gap-3 text-xs text-[#8A7A65] mb-3 flex-wrap">
                    <span>⛽ {annonce.carburant}</span>
                    <span>🛣 {annonce.kilometrage.toLocaleString()} km</span>
                    <span>📍 {annonce.ville}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#1A1208] text-xl">
                      {annonce.prix.toLocaleString()} <span className="text-xs font-normal text-[#8A7A65]">FCFA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/5 text-xs text-[#8A7A65]">
                    <div className="w-6 h-6 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-[10px]">
                      {annonce.vendeur.nom[0]}
                    </div>
                    <span>{annonce.vendeur.nom} {annonce.vendeur.prenom}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}