import 'reflect-metadata'

import {
  Resolver,
  Query,
  Field,
  ObjectType,
  Ctx,
  ID,
  Arg,
  Mutation,
  Authorized,
  FieldResolver,
  Root,
} from 'type-graphql'

import type { Context } from '@/utils/graphql'
import { AuthPayload, SignUpInput } from '@/resolvers/types/AuthTypes'
import { SignInInput } from '@/resolvers/types/SignInTypes'
import { FindManyUsersInput } from '@/resolvers/types/FindManyUsersInput'
import { Role } from '@/resolvers/types/Role'

import { PermissionName } from 'csci32-database'

@ObjectType()
class User {
  @Field(() => ID)
  user_id!: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => String, { nullable: true })
  email?: string | null

  // Internal field used by the role field resolver.
  // This is not exposed directly in GraphQL.
  role_id?: string | null
}

@Resolver(() => User)
export class UserResolver {
  @Authorized([PermissionName.UserRead])
  @Query(() => [User])
  findManyUsers(
    @Ctx() { userService }: Context,
    @Arg('params', () => FindManyUsersInput, {
      nullable: true,
    })
    params?: FindManyUsersInput,
  ) {
    return userService.findMany(params ?? {})
  }

  @Authorized([PermissionName.UserRead])
  @Query(() => Number)
  totalUsers(
    @Ctx() { userService }: Context,
    @Arg('params', () => FindManyUsersInput, {
      nullable: true,
    })
    params?: FindManyUsersInput,
  ) {
    return userService.getTotalUsers(params?.filters ?? {})
  }

  @Mutation(() => AuthPayload)
  async signUp(
    @Arg('input', () => SignUpInput) input: SignUpInput,
    @Ctx() { userService }: Context,
  ): Promise<AuthPayload> {
    if (!input.email || !input.password) {
      throw new Error('email and password are required')
    }

    const { user, token } = await userService.createUser(input)

    return {
      user,
      token,
    }
  }

  @Mutation(() => AuthPayload)
  async signIn(
    @Arg('input', () => SignInInput) input: SignInInput,
    @Ctx() { userService }: Context,
  ): Promise<AuthPayload> {
    if (!input.email || !input.password) {
      throw new Error('email and password are required')
    }

    const { user, token } = await userService.authenticateUser(input)

    return {
      user,
      token,
    }
  }

  @FieldResolver(() => Role, { nullable: true })
  async role(@Root() user: User, @Ctx() ctx: Context) {
    if (!user.role_id) {
      return null
    }

    return ctx.prisma.role.findUnique({
      where: {
        role_id: user.role_id,
      },
    })
  }
}
