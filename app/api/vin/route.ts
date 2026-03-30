import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const vin = searchParams.get('vin')

    if (!vin || vin.length !== 17) {
      return NextResponse.json(
        { error: 'Le VIN doit contenir exactement 17 caractères' },
        { status: 400 }
      )
    }

    const premierCaractere = vin[0].toUpperCase()
    const origineUSA = ['1', '2', '3', '4', '5'].includes(premierCaractere)
    const origineEurope = ['S', 'V', 'W', 'X', 'Z'].includes(premierCaractere)

    if (origineUSA) {
      // API NHTSA gratuite pour les véhicules américains
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      )
      const data = await res.json()

      if (!data.Results) {
        return NextResponse.json({ error: 'VIN introuvable' }, { status: 404 })
      }

      const getValue = (variable: string) => {
        const item = data.Results.find((r: { Variable: string; Value: string }) => r.Variable === variable)
        return item?.Value || null
      }

      const marque = getValue('Make')
      const modele = getValue('Model')
      const annee = getValue('Model Year')
      const pays = getValue('Plant Country')
      const carburant = getValue('Fuel Type - Primary')
      const typeVehicule = getValue('Vehicle Type')
      const cylindres = getValue('Engine Number of Cylinders')

      return NextResponse.json({
        origine: 'USA',
        vin,
        marque,
        modele,
        annee,
        pays,
        carburant,
        typeVehicule,
        cylindres,
        source: 'NHTSA — National Highway Traffic Safety Administration',
        gratuit: true,
      })
    }

    if (origineEurope) {
      return NextResponse.json({
        origine: 'Europe',
        vin,
        message: 'Ce véhicule est d\'origine européenne.',
        recommandation: 'Pour un rapport complet (accidents, kilométrage, propriétaires), utilisez carVertical.',
        lienCarVertical: 'https://www.carvertical.com/fr/verification?vin=' + vin,
        gratuit: false,
      })
    }

    // Autres origines
    return NextResponse.json({
      origine: 'Autre',
      vin,
      message: 'Origine du véhicule non identifiée automatiquement.',
      recommandation: 'Consultez un professionnel pour vérifier ce VIN.',
      gratuit: false,
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du VIN' },
      { status: 500 }
    )
  }
}