import { requireAuth } from '@/src/lib/auth'
import { ProxyAuthRequest } from '@/src/lib/proxy.auth.request'
import { NextResponse } from 'next/server'

export const GET = ProxyAuthRequest(async (req, auth) => {
  try {
    const auth = await requireAuth(req)
    if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status })

    return NextResponse.json({ message: 'You are authenticated' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
})
