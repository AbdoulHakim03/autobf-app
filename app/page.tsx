export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      {/* HERO */}
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
            historique VIN depuis l'Europe. Le marché auto burkinabè
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

      {/* STATS */}
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

      {/* CARDS */}
      <section className="py-20 px-[5%]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#1A1208]">
            Meilleures <span className="text-[#C17B2E] italic">affaires</span> du moment
          </h2>
          <a href="/search" className="text-sm text-[#C17B2E] font-semibold hover:underline">
            Voir tout →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: "Toyota RAV4 2017", price: "6 500 000", km: "87 000 km", fuel: "Essence", city: "Ouagadougou", seller: "MN", note: "4.9" },
            { name: "Kia Sportage 2019", price: "8 200 000", km: "61 000 km", fuel: "Diesel", city: "Ouagadougou", seller: "KF", note: "4.7" },
            { name: "Toyota Yaris 2015", price: "3 200 000", km: "112 000 km", fuel: "Essence", city: "Bobo-Dioulasso", seller: "AB", note: "5.0" },
            { name: "Toyota Highlander 2018", price: "14 500 000", km: "65 000 km", fuel: "Essence", city: "Ouagadougou", seller: "LA", note: "4.8" },
          ].map((car) => (
            <a href="/search" key={car.name} className="bg-white rounded-2xl border border-black/10 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer block">
              <div className="h-44 bg-[#EDE8DF] flex items-center justify-center text-6xl">
                🚗
              </div>
              <div className="p-4">
                <div className="font-bold text-[#1A1208] text-lg mb-2">{car.name}</div>
                <div className="flex gap-3 text-xs text-[#8A7A65] mb-3">
                  <span>⛽ {car.fuel}</span>
                  <span>📍 {car.city}</span>
                  <span>🛣 {car.km}</span>
                </div>
                <div className="font-bold text-[#1A1208] text-xl">
                  {car.price} <span className="text-xs font-normal text-[#8A7A65]">FCFA</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/5 text-xs text-[#8A7A65]">
                  <div className="w-6 h-6 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-[10px]">{car.seller}</div>
                  <span>★ {car.note}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
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

      {/* FOOTER */}
      <footer className="bg-[#1A1208] py-10 px-[5%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-2xl text-white">
            Auto<span className="text-[#C17B2E]">BF</span>
          </div>
          <div className="flex gap-6">
            <a href="/search" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Acheter</a>
            <a href="/publier" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Vendre</a>
            <a href="/dashboard" className="text-sm text-[#8A7A65] hover:text-white transition-colors">Mon compte</a>
          </div>
          <p className="text-[#8A7A65] text-sm">© 2026 AutoBF — OUEDRAOGO Abdoul Hakim</p>
        </div>
      </footer>

    </main>
  )
} 