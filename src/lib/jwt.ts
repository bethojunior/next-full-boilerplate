import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

export function signJwt(payload: Record<string, any>, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    ...(options ?? {}),
  })
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T
  } catch (err) {
    return null
  }
}
