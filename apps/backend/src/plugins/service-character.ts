import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

import { PRISMA_FASTIFY_PLUGIN_NAME } from './prisma'
import { CharacterService } from '@/services/CharacterService'

declare module 'fastify' {
  interface FastifyInstance {
    characterService: CharacterService
  }
}

export const CHARACTER_SERVICE_FASTIFY_PLUGIN_NAME = 'characterService'

export default fp(
  async function characterServicePlugin(fastify: FastifyInstance) {
    const characterService = new CharacterService({
      prisma: fastify.prisma,
    })

    fastify.decorate(CHARACTER_SERVICE_FASTIFY_PLUGIN_NAME, characterService)
  },
  {
    name: CHARACTER_SERVICE_FASTIFY_PLUGIN_NAME,
    dependencies: [PRISMA_FASTIFY_PLUGIN_NAME],
  },
)
