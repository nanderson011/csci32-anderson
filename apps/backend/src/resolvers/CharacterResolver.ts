import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'

import type { Context } from '@/utils/graphql'
import { CreateCharacterInput } from '@/resolvers/types/CreateCharacterInput'
import { CharacterSortField, ListCharactersInput, SortDirection } from '@/resolvers/types/ListCharactersInput'
import { Character } from '@/resolvers/types/Character'
import { getDecodedToken } from '@/utils/authHelpers'

@Resolver()
export class CharacterResolver {
  @Mutation(() => String)
  async createCharacter(
    @Ctx() ctx: Context,
    @Arg('input', () => CreateCharacterInput)
    input: CreateCharacterInput,
  ): Promise<string> {
    const ownerUserId = getDecodedToken(ctx).sub

    const character = await ctx.characterService.createForUser(input, ownerUserId)

    return character.character_id
  }

  // NEW: public find one by ID
  @Query(() => Character, { nullable: true })
  async findCharacterById(@Ctx() ctx: Context, @Arg('id', () => ID) id: string): Promise<Character | null> {
    return ctx.characterService.findOneById(id)
  }

  // NEW: public find many with search + pagination + sorting
  @Query(() => [Character])
  async findManyCharacters(
    @Ctx() ctx: Context,
    @Arg('input', () => ListCharactersInput, {
      nullable: true,
    })
    input?: ListCharactersInput,
  ): Promise<Character[]> {
    return ctx.characterService.findMany({
      search: input?.search ?? '',
      skip: input?.skip ?? 0,
      take: input?.take ?? 10,
      sortField: input?.sortField ?? CharacterSortField.Name,
      sortDirection: input?.sortDirection ?? SortDirection.Asc,
    })
  }
}
