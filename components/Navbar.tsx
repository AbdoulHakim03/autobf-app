'use client'

import { useState, useEffect } from 'react'

type User = {
  id: string
  nom: string
  prenom: string
  email: string
  role: string
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] bg-[#F5F0E8]/90 backdrop-blur-md border-b border-black/10">
      <a href="/" className="font-bold text-xl text-[#1A1208]">
        Auto<span className="text-[#C17B2E]">BF</span>
      </a>

      <div className="hidden md:flex items-center gap-6">
        <a href="/search" className="text-sm font-medium text-[#8A7A65] hover:text-[#1A1208] transition-colors">Acheter</a>
        <a href="/publier" className="text-sm font-medium text-[#8A7A65] hover:text-[#1A1208] transition-colors">Vendre</a>
        {user && (
          <>
            <a href="/dashboard" className="text-sm font-medium text-[#8A7A65] hover:text-[#1A1208] transition-colors">Mon compte</a>
            <a href="/messages" className="text-sm font-medium text-[#8A7A65] hover:text-[#1A1208] transition-colors">Messages</a>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <a href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C17B2E]/10 border border-[#C17B2E]/20 text-sm font-medium text-[#C17B2E] hover:bg-[#C17B2E]/20 transition-all">
              <div className="w-6 h-6 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-xs">
                {user.nom[0]}
              </div>
              {user.prenom}
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-black/10 text-sm font-medium text-[#8A7A65] hover:border-red-300 hover:text-red-500 transition-all"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="px-5 py-2 rounded-lg border border-black/10 text-sm font-medium text-[#3D3020] hover:border-[#C17B2E] hover:text-[#C17B2E] transition-all">
              Connexion
            </a>
            <a href="/inscription" className="px-5 py-2 rounded-lg bg-[#C17B2E] text-white text-sm font-semibold hover:bg-[#A86520] transition-all shadow-md">
              S'inscrire
            </a>
          </>
        )}
        <a href="/publier" className="hidden md:block px-5 py-2 rounded-lg bg-[#1A1208] text-white text-sm font-semibold hover:bg-[#2D1F0E] transition-all shadow-md">
          + Publier
        </a>
      </div>
    </nav>
  )
}
 