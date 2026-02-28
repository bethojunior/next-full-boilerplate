import { NextResponse } from 'next/server'
import { CreateUserUseCase } from './use-cases/create-user.usecase'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const useCase = new CreateUserUseCase()
    const result = await useCase.execute(body)

    return NextResponse.json(result, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
