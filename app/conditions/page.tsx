export default function Conditions() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="max-w-4xl mx-auto px-[5%] py-16">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1A1208] mb-4" style={{letterSpacing: '-1px'}}>
            Conditions d'utilisation
          </h1>
          <p className="text-[#8A7A65]">Dernière mise à jour : Mars 2026</p>
        </div>

        <div className="flex flex-col gap-10">

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">1. Présentation d'AutoBF</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF (Auto Best Found) est le premier marketplace automobile sécurisé du Burkina Faso. 
              Notre plateforme met en relation acheteurs et vendeurs de véhicules d'occasion en offrant 
              un système de paiement sécurisé par escrow, des vendeurs vérifiés par intelligence artificielle, 
              et un historique VIN certifié. AutoBF est basé au Burkina Faso.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">2. Acceptation des conditions</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              En utilisant AutoBF, vous acceptez pleinement et sans réserve les présentes conditions 
              d'utilisation. 
              AutoBF se réserve le droit de modifier ces conditions à tout moment. Les modifications 
              prennent effet dès leur publication sur le site.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">3. Inscription et compte utilisateur</h2>
            <p className="text-[#8A7A65] leading-relaxed mb-4">
              Pour utiliser certaines fonctionnalités d'AutoBF, vous devez créer un compte en fournissant 
              des informations exactes et complètes. Vous êtes responsable de la confidentialité de votre 
              mot de passe et de toutes les activités effectuées depuis votre compte.
            </p>
            <ul className="list-disc list-inside text-[#8A7A65] space-y-2">
              <li>Vous devez avoir au moins 18 ans pour utiliser AutoBF</li>
              <li>Vos informations doivent être réelles et vérifiables</li>
              <li>Un seul compte par personne est autorisé</li>
              <li>AutoBF se réserve le droit de suspendre tout compte frauduleux</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">4. Publication d'annonces</h2>
            <p className="text-[#8A7A65] leading-relaxed mb-4">
              Les vendeurs s'engagent à publier des annonces exactes et conformes à la réalité. 
              Toute annonce frauduleuse, trompeuse ou illégale sera supprimée immédiatement.
            </p>
            <ul className="list-disc list-inside text-[#8A7A65] space-y-2">
              <li>Les informations du véhicule doivent être exactes</li>
              <li>Les photos doivent correspondre au véhicule réel</li>
              <li>Le prix doit être le prix réel de vente</li>
              <li>Les véhicules volés ou non dédouanés illégalement sont interdits</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">5. Système de paiement Escrow</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF utilise un système de paiement escrow pour sécuriser les transactions. Les fonds 
              de l'acheteur sont bloqués sur un compte sécurisé jusqu'à confirmation de la réception 
              du véhicule. Les frais de service AutoBF sont de 2.5% du montant de la transaction, 
              à la charge de l'acheteur. AutoBF n'est pas responsable des litiges liés à l'état du 
              véhicule non déclaré par le vendeur.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">6. Responsabilités</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              AutoBF agit comme intermédiaire entre acheteurs et vendeurs. Nous ne sommes pas 
              propriétaires des véhicules listés sur notre plateforme. AutoBF décline toute 
              responsabilité pour les vices cachés, les défauts mécaniques non déclarés, ou tout 
              autre problème lié au véhicule après la transaction confirmée.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1208] mb-4">7. Contact</h2>
            <p className="text-[#8A7A65] leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, contactez-nous à :<br/>
              <span className="text-[#C17B2E] font-medium">contact@autobf.africa</span>
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}