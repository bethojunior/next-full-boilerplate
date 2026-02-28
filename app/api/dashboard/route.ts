import { NextResponse } from 'next/server'
import { requireAuth } from '@/src/lib/auth'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const auth = await requireAuth(req)
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status })
  }

  return NextResponse.json({ message: 'rota protegida', user: auth.user })
}
