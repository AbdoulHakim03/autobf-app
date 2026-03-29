'use client'

import { useState } from 'react'

export default function Inscription() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    ville: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    setMessage('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Compte créé avec succès ! Bienvenue sur AutoBF.')
        setForm({ nom: '', prenom: '', email: '', telephone: '', password: '', ville: '' })
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
    <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4 py-20">
 

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="font-bold text-3xl text-[#1A1208] mb-2">
            Auto<span className="text-[#C17B2E]">BF</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1208] mb-2">
            Créer un compte vendeur
          </h1>
          <p className="text-sm text-[#8A7A65]">
            Rejoins le premier marketplace automobile du Burkina Faso
          </p>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-md p-8">

          {message && (
            <div className="mb-5 p-4 rounded-xl bg-[#2A7A4B]/10 border border-[#2A7A4B]/25 text-[#2A7A4B] text-sm font-medium">
              {message}
            </div>
          )}

          {erreur && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                  Nom
                </label>
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="OUEDRAOGO"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                  Prénom
                </label>
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Téléphone
              </label>
              <input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="+226 XX XX XX XX"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Ville
              </label>
              <select
                name="ville"
                value={form.ville}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] transition-all"
              >
                <option value="">Choisir une ville</option>
                <option value="Ouagadougou">Ouagadougou</option>
                <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                <option value="Koudougou">Koudougou</option>
                <option value="Banfora">Banfora</option>
                <option value="Ouahigouya">Ouahigouya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8A7A65] uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-base hover:bg-[#A86520] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Création en cours...' : 'Créer mon compte →'}
            </button>

          </form>

          <p className="text-xs text-[#8A7A65] text-center mt-5 leading-relaxed">
            En créant un compte tu acceptes nos{' '}
            <a href="#" className="text-[#C17B2E] font-medium">conditions d'utilisation</a>
            {' '}et notre{' '}
            <a href="#" className="text-[#C17B2E] font-medium">politique de confidentialité</a>
          </p>
        </div>
      </div>
    </main>
  )
}
