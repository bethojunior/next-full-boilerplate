import { PrismaClient } from '@prisma/client'
import { verifyJwt } from './jwt'

const prisma = new PrismaClient()

export async function requireAuth(req: Request) {
  try {
    const auth = (req.headers as any).get?.('authorization') || (req as any).headers?.authorization
    if (!auth) return { ok: false, status: 401, message: 'No token' }

    const parts = auth.split(' ')
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return { ok: false, status: 401, message: 'Invalid authorization format' }
    }

    const token = parts[1]
    const payload = verifyJwt<{ sub: string }>(token)
    if (!payload || !payload.sub) {
      return { ok: false, status: 401, message: 'Invalid token' }
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, createdAt: true }
    })

    if (!user) return { ok: false, status: 401, message: 'User not found' }

    return { ok: true, user }
  } catch (err) {
    console.error('[requireAuth]', err)
    return { ok: false, status: 500, message: 'Internal' }
  }
}
