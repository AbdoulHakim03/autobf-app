export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="max-w-4xl mx-auto px-[5%] py-16">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1A1208] mb-4" style={{letterSpacing: '-1px'}}>
            Politique de confidentialité
          </h1>
          <p className="text-[#8A7A65]">Dernière mise à jour : Mars 2026</p>
        </div>

        <div className="flex flex-col gap-10">

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">1. Données collectées</h2>
            <p className="text-[#8A7A65] leading-relaxed mb-4">
              AutoBF collecte les données suivantes lors de votre inscription et utilisation :
            </p>
            <ul className="list-disc list-inside text-[#8A7A65] space-y-2">
              <li>Nom, prénom et adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Ville de résidence</li>
              <li>Photos des véhicules publiés</li>
              <li>Historique des transactions</li>
              <li>Messages échangés sur la plateforme</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">2. Utilisation des données</h2>
            <p className="text-[#8A7A65] leading-relaxed mb-4">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc list-inside text-[#8A7A65] space-y-2">
              <li>Gérer votre compte et vos annonces</li>
              <li>Sécuriser les transactions via le système escrow</li>
              <li>Vous envoyer des notifications importantes par SMS</li>
              <li>Améliorer nos services et prévenir les fraudes</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">3. Protection des données</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF prend la sécurité de vos données très au sérieux. Vos mots de passe sont 
              chiffrés avec bcrypt. Toutes les communications sont sécurisées via HTTPS. 
              Vos données financières sont gérées par FedaPay, un prestataire de paiement certifié. 
              Vos photos sont stockées sur Cloudinary avec des accès sécurisés.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">4. Partage des données</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF ne vend jamais vos données personnelles à des tiers. Vos données peuvent 
              être partagées uniquement avec nos prestataires de services (FedaPay pour les paiements, 
              Cloudinary pour les photos, Africa's Talking pour les SMS) dans le strict cadre 
              de la fourniture de nos services.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">5. Cookies</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF utilise des cookies essentiels pour maintenir votre session de connexion 
              (cookie JWT sécurisé httpOnly). Nous n'utilisons pas de cookies publicitaires 
              ou de tracking tiers.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">6. Vos droits</h2>
            <p className="text-[#8A7A65] leading-relaxed mb-4">
              Conformément aux lois en vigueur, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-[#8A7A65] space-y-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit de suppression de votre compte</li>
              <li>Droit de portabilité de vos données</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">7. Contact</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              Pour exercer vos droits ou pour toute question concernant notre politique de 
              confidentialité, contactez-nous à :<br/>
              <span className="text-[#C17B2E] font-medium">contact@autobf.africa</span>
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}