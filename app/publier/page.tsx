'use client'

import { useState } from 'react'

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

export default function Publier() {
  const [form, setForm] = useState({
    marque: '',
    modele: '',
    annee: '',
    kilometrage: '',
    carburant: '',
    boite: '',
    couleur: '',
    prix: '',
    ville: '',
    description: '',
    dedouane: false,
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setUploadLoading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          setPhotos(prev => [...prev, data.url])
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setUploadLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    setMessage('')

    try {
      const res = await fetch('/api/annonces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos: JSON.stringify(photos) }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('✅ Annonce publiée avec succès !')
        setForm({
          marque: '', modele: '', annee: '', kilometrage: '',
          carburant: '', boite: '', couleur: '', prix: '',
          ville: '', description: '', dedouane: false,
        })
        setPhotos([])
      } else {
        setErreur(data.error || 'Une erreur est survenue')
      }
    } catch {
      setErreur('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] pb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] bg-[#F5F0E8]/90 backdrop-blur-md border-b border-black/10">
        <a href="/" className="font-bold text-xl text-[#1A1208]">
          Auto<span className="text-[#C17B2E]">BF</span>
        </a>
        <a href="/dashboard" className="px-5 py-2 rounded-lg border border-black/10 text-sm font-medium text-[#3D3020] hover:border-[#C17B2E] hover:text-[#C17B2E] transition-all">
          Mon compte
        </a>
      </nav>

      <div className="pt-24 px-[5%] max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1208] mb-2">Publier une annonce</h1>
          <p className="text-[#8A7A65]">Remplis les informations de ton véhicule</p>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#2A7A4B]/10 border border-[#2A7A4B]/25 text-[#2A7A4B] font-medium">
            {message}
          </div>
        )}

        {erreur && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-medium">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6">
            <h2 className="font-bold text-lg text-[#1A1208] mb-5">🚗 Informations du véhicule</h2>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Marque</label>
                <select name="marque" value={form.marque} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                  <option value="">Choisir</option>
                  {MARQUES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Modèle</label>
                <input name="modele" value={form.modele} onChange={handleChange} required
                  placeholder="RAV4, Sportage..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Année</label>
                <input name="annee" value={form.annee} onChange={handleChange} required
                  type="number" placeholder="2017"
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Kilométrage</label>
                <input name="kilometrage" value={form.kilometrage} onChange={handleChange} required
                  type="number" placeholder="87000"
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Carburant</label>
                <select name="carburant" value={form.carburant} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                  <option value="">Choisir</option>
                  <option>Essence</option>
                  <option>Diesel</option>
                  <option>Hybride</option>
                  <option>Électrique</option>
                  <option>GPL</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Boîte</label>
                <select name="boite" value={form.boite} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                  <option value="">Choisir</option>
                  <option>Automatique</option>
                  <option>Manuelle</option>
                  <option>Semi-automatique</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Couleur</label>
                <input name="couleur" value={form.couleur} onChange={handleChange} required
                  placeholder="Blanc, Noir, Rouge..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Ville</label>
                <select name="ville" value={form.ville} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all">
                  <option value="">Choisir</option>
                  {VILLES.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>

            </div>

            <div className="mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="dedouane" checked={form.dedouane} onChange={handleChange}
                  className="w-5 h-5 accent-[#C17B2E]" />
                <span className="text-sm font-medium text-[#3D3020]">Véhicule dédouané ✅</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6">
            <h2 className="font-bold text-lg text-[#1A1208] mb-5">💰 Prix</h2>
            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">Prix en FCFA</label>
              <input name="prix" value={form.prix} onChange={handleChange} required
                type="number" placeholder="6500000"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6">
            <h2 className="font-bold text-lg text-[#1A1208] mb-5">📝 Description</h2>
            <textarea name="description" value={form.description} onChange={handleChange} required
              rows={5} placeholder="Décris ton véhicule en détail..."
              className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all resize-none" />
          </div>

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6">
            <h2 className="font-bold text-lg text-[#1A1208] mb-5">📸 Photos du véhicule</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-sm text-[#8A7A65] cursor-pointer"
            />
            {uploadLoading && (
              <p className="text-sm text-[#C17B2E] mt-3">Upload en cours...</p>
            )}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {photos.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt={`photo ${i+1}`} className="w-full h-24 object-cover rounded-xl border border-black/10" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-base hover:bg-[#A86520] transition-all shadow-lg disabled:opacity-50">
            {loading ? 'Publication en cours...' : 'Publier mon annonce →'}
          </button>

        </form>
      </div>
    </main>
  )
}