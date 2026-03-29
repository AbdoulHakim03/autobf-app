'use client'

import { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = '/'
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
        <div className="text-center mb-8">
          <div className="font-bold text-3xl text-[#1A1208] mb-2">
            Auto<span className="text-[#C17B2E]">BF</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1208] mb-2">Connexion</h1>
          <p className="text-sm text-[#8A7A65]">Content de te revoir sur AutoBF</p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 shadow-md p-8">
          {erreur && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ton mot de passe"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-black/10 text-[#1A1208] text-sm outline-none focus:border-[#C17B2E] focus:ring-2 focus:ring-[#C17B2E]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#C17B2E] text-white font-bold text-base hover:bg-[#A86520] transition-all shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          <p className="text-sm text-[#8A7A65] text-center mt-5">
            Pas encore de compte ?{' '}
            <a href="/inscription" className="text-[#C17B2E] font-medium hover:underline">
              S'inscrire gratuitement
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}