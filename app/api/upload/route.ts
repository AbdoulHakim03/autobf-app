import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dl2ma4dpl',
  api_key: process.env.CLOUDINARY_API_KEY || '712313897316494',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Mz57lB31j5AB4DR9vVUGmKtsAWU',
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier reçu' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'autobf',
          transformation: [
            { width: 1200, height: 800, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const uploadResult = result as { secure_url: string, public_id: string }

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur upload' },
      { status: 500 }
    )
  }
}