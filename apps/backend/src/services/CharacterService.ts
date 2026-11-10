import type { PrismaClient, Prisma } from 'csci32-database'

export interface ServiceDeps {
  prisma: PrismaClient
}

export type CreateCharacterInput = {
  name: string
  level?: number
  classId: string
}

// NEW: options for listing characters
export type ListCharactersOptions = {
  search?: string
  skip?: number
  take?: number
  sortField?: 'name' | 'level'
  sortDirection?: 'asc' | 'desc'
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

  // NEW: find one character by ID
  async findOneById(id: string) {
    const { prisma } = this.deps

    return prisma.character.findUnique({
      where: {
        character_id: id,
      },
    })
  }

  // NEW: find many characters with search + pagination + sorting
  async findMany(options: ListCharactersOptions = {}) {
    const { prisma } = this.deps

    const { search, skip = 0, take = 10, sortField = 'name', sortDirection = 'asc' } = options

    const where: Prisma.CharacterWhereInput = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {}

    const orderBy: Prisma.CharacterOrderByWithRelationInput = {
      [sortField]: sortDirection,
    }

    return prisma.character.findMany({
      where,
      orderBy,
      skip,
      take,
    })
  }
}
