import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateCharacterInput {
  @Field(() => String)
  name!: string

  @Field(() => Int, { nullable: true })
  level?: number

  @Field(() => String)
  classId!: string
}
