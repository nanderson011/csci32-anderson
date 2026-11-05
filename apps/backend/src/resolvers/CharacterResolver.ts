import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import type { Context } from '@/utils/graphql'
import { CreateCharacterInput } from '@/resolvers/types/CreateCharacterInput'
import { getDecodedToken } from '@/utils/authHelpers'

@Resolver()
export class CharacterResolver {
  @Mutation(() => String)
  async createCharacter(@Ctx() ctx: Context, @Arg('input', () => CreateCharacterInput) input: CreateCharacterInput,): Promise<string> {
    const ownerUserId = getDecodedToken(ctx).sub

    const character = await ctx.characterService.createForUser(input, ownerUserId)

    return character.character_id
  }
}
