'use client'

import { useState, useEffect } from 'react'

type Annonce = {
  id: string
  marque: string
  modele: string
  annee: number
  prix: number
  carburant: string
  ville: string
  kilometrage: number
  photos: string
  vendeur: {
    nom: string
    prenom: string
  }
}

export default function Home() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])

  useEffect(() => {
    fetch('/api/annonces?limit=4')
      .then(res => res.json())
      .then(data => setAnnonces(data.annonces || []))
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      <section className="pt-40 pb-20 px-[5%]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C17B2E]/10 border border-[#C17B2E]/20 text-[#C17B2E] text-xs font-bold uppercase tracking-wider mb-6">
            🇧🇫 Marketplace N°1 au Burkina Faso
          </div>
          <h1 className="text-6xl font-bold text-[#1A1208] leading-tight mb-6" style={{letterSpacing: '-2px'}}>
            Achetez & vendez<br />
            en toute <span className="text-[#C17B2E] italic">confiance</span>
          </h1>
          <p className="text-lg text-[#8A7A65] max-w-lg mb-10 leading-relaxed">
            Vendeurs vérifiés par IA, paiement sécurisé par escrow,
            historique VIN depuis l'Europe, l'Amerique et le Moyen Orient. Le marché auto burkinabè
            tel qu'il devrait être.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="/search" className="px-8 py-4 rounded-xl bg-[#C17B2E] text-white font-semibold text-base hover:bg-[#A86520] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Trouver ma voiture →
            </a>
            <a href="/publier" className="px-8 py-4 rounded-xl bg-white text-[#3D3020] font-medium text-base border border-black/10 hover:border-[#C17B2E] hover:text-[#C17B2E] transition-all shadow-sm">
              Publier une annonce
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1208] py-12 px-[5%]">
        <div className="flex justify-center gap-20 flex-wrap">
          {[
            { num: "2 400+", label: "Véhicules disponibles" },
            { num: "1 800+", label: "Vendeurs vérifiés" },
            { num: "98%", label: "Transactions réussies" },
            { num: "0", label: "Arnaque signalée" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{s.num}</div>
              <div className="text-xs text-[#8A7A65] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[5%]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#1A1208]">
            Meilleures <span className="text-[#C17B2E] italic">affaires</span> du moment
          </h2>
          <a href="/search" className="text-sm text-[#C17B2E] font-semibold hover:underline">
            Voir tout →
          </a>
        </div>

        {annonces.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🚗</div>
            <p className="text-[#8A7A65] mb-4">Aucune annonce pour l'instant</p>
            <a href="/publier" className="px-6 py-3 rounded-xl bg-[#C17B2E] text-white font-semibold hover:bg-[#A86520] transition-all">
              Publier la première annonce →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {annonces.map((annonce) => {
              const photos = annonce.photos ? JSON.parse(annonce.photos) : []
              return (
                <a href={'/detail/' + annonce.id} key={annonce.id} className="bg-white rounded-2xl border border-black/10 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[#C17B2E] transition-all cursor-pointer block">
                  <div className="h-44 bg-[#EDE8DF] relative overflow-hidden">
                    {photos.length > 0 ? (
                      <img src={photos[0]} alt={annonce.marque + ' ' + annonce.modele} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">🚗</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-[#1A1208] text-lg mb-2">{annonce.marque} {annonce.modele} {annonce.annee}</div>
                    <div className="flex gap-3 text-xs text-[#8A7A65] mb-3">
                      <span>⛽ {annonce.carburant}</span>
                      <span>📍 {annonce.ville}</span>
                      <span>🛣 {annonce.kilometrage.toLocaleString()} km</span>
                    </div>
                    <div className="font-bold text-[#1A1208] text-xl">
                      {annonce.prix.toLocaleString()} <span className="text-xs font-normal text-[#8A7A65]">FCFA</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/5 text-xs text-[#8A7A65]">
                      <div className="w-6 h-6 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-[10px]">
                        {annonce.vendeur.nom[0]}
                      </div>
                      <span>{annonce.vendeur.nom} {annonce.vendeur.prenom}</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </section>

      <section className="py-20 px-[5%] bg-[#EDE8DF]">
        <h2 className="text-3xl font-bold text-[#1A1208] mb-12 text-center">
          Comment ça <span className="text-[#C17B2E] italic">marche</span> ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🔍", title: "Cherche ta voiture", desc: "Filtre par budget, marque, ville. Notre IA te suggère les meilleures offres." },
            { icon: "✅", title: "Vendeur vérifié", desc: "Chaque vendeur est identifié par CNI. Les photos sont contrôlées par 8 agents IA." },
            { icon: "🔒", title: "Paiement bloqué", desc: "Ton argent est sécurisé sur un compte escrow AutoBF jusqu'à confirmation." },
            { icon: "🚗", title: "Reçois ta voiture", desc: "Tu confirmes par SMS. Le vendeur reçoit son argent. Contrat PDF signé automatiquement." },
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-lg text-[#1A1208] mb-2">{step.title}</h3>
              <p className="text-sm text-[#8A7A65] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#1A1208] py-10 px-[5%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-2xl text-white">
            Auto<span className="text-[#C17B2E]">BF</span>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="/search" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Acheter</a>
            <a href="/publier" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Vendre</a>
            <a href="/dashboard" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Mon compte</a>
            <a href="/conditions" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Conditions</a>
            <a href="/confidentialite" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Confidentialité</a>
          </div>
          <div className="text-center">
            <p className="text-[#8A7A65] text-sm">© 2026 AutoBF — Tous droits réservés.</p>
            <p className="text-[#8A7A65] text-xs mt-1">📧 contact@autobf.africa &nbsp;·&nbsp; 📞 +226 55 31 59 69</p>
          </div>
        </div>
      </footer>

    </main>
  )
}