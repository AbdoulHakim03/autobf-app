import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'autobf-secret-key-2026'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('autobf-token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded = jwt.verify(token, SECRET) as {
      id: string
      nom: string
      prenom: string
      email: string
      role: string
    }

    return NextResponse.json({ user: decoded })

  } catch {
    return NextResponse.json({ user: null })
  }
}