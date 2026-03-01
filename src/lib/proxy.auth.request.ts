import { requireAuth } from '@/src/lib/auth'
import { NextResponse } from 'next/server'

type Handler = (req: Request, auth: any) => Promise<Response>

export function ProxyAuthRequest(handler: Handler) {
  return async function (req: Request) {
    try {
      const auth = await requireAuth(req)

      if (!auth.ok) {
        return NextResponse.json({ message: auth.message }, { status: auth.status })
      }

      return handler(req, auth)
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
  }
}
