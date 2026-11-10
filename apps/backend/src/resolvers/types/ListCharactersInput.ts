import { Field, InputType, Int, registerEnumType } from 'type-graphql'

export enum CharacterSortField {
  Name = 'name',
  Level = 'level',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

registerEnumType(CharacterSortField, {
  name: 'CharacterSortField',
})

registerEnumType(SortDirection, {
  name: 'SortDirection',
})

@InputType()
export class ListCharactersInput {
  @Field(() => String, { nullable: true })
  search?: string

  @Field(() => Int, {
    nullable: true,
    description: 'Number of records to skip',
  })
  skip?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Number of records to take',
  })
  take?: number

  @Field(() => CharacterSortField, {
    nullable: true,
    description: 'Field to sort by (defaults to name)',
  })
  sortField?: CharacterSortField

  @Field(() => SortDirection, {
    nullable: true,
    description: 'Sort direction (defaults to Asc)',
  })
  sortDirection?: SortDirection
}
