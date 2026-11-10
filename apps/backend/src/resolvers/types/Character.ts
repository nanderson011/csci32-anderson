import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Character {
  @Field(() => ID)
  character_id!: string

  @Field(() => String)
  name!: string

  @Field(() => Int)
  level!: number

  user_id!: string

  class_id!: string
}
