import type { PrismaClient } from 'csci32-database'

export interface ServiceDeps {
  prisma: PrismaClient
}

export type CreateCharacterInput = {
  name: string
  level?: number
  classId: string
}

export class CharacterService {
  constructor(private deps: ServiceDeps) {}

  async createForUser(input: CreateCharacterInput, ownerUserId: string) {
    const { prisma } = this.deps
    const { name, level = 1, classId } = input

    return prisma.character.create({
      data: {
        name,
        level,

        user: {
          connect: {
            user_id: ownerUserId,
          },
        },

        class: {
          connect: {
            class_id: classId,
          },
        },
      },

      include: {
        user: true,
        class: true,
      },
    })
  }
}
