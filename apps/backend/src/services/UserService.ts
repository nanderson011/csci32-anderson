import type { SignUpInput } from '@/resolvers/types/AuthTypes'
import { hashPassword, signToken } from '@/utils/auth'
import type { PrismaClient } from 'csci32-database'

export interface UserServiceProps {
  prisma: PrismaClient
}

export class UserService {
  prisma: PrismaClient

  constructor({ prisma }: UserServiceProps) {
    this.prisma = prisma
  }

  findMany() {
    return this.prisma.user.findMany()
  }

  async createUser(params: SignUpInput) {
    const { email, password, name } = params

    const existing = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      throw new Error('Email already in use')
    }

    const passwordHash = await hashPassword(password)

    const created = await this.prisma.user.create({
      data: {
        email,
        name: name ?? null,
        passwordHash,
      },
      select: {
        user_id: true,
        email: true,
        name: true,
      },
    })

    const token = signToken({
      sub: created.user_id,
      email: created.email,
      name: created.name ?? undefined,
    })

    return {
      user: created,
      token,
    }
  }
}
