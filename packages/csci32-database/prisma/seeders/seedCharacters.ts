import type { PrismaClient } from '@prisma/client'

export async function seedCharacters(prisma: PrismaClient) {
  // Clear characters first so the seed can be run repeatedly.
  await prisma.character.deleteMany()

  // Create or update reusable D&D classes.
  const fighter = await prisma.characterClass.upsert({
    where: { name: 'Fighter' },
    update: {
      hit_die: 10,
    },
    create: {
      name: 'Fighter',
      hit_die: 10,
    },
  })

  const wizard = await prisma.characterClass.upsert({
    where: { name: 'Wizard' },
    update: {
      hit_die: 6,
    },
    create: {
      name: 'Wizard',
      hit_die: 6,
    },
  })

  await prisma.characterClass.upsert({
    where: { name: 'Rogue' },
    update: {
      hit_die: 8,
    },
    create: {
      name: 'Rogue',
      hit_die: 8,
    },
  })

  await prisma.characterClass.upsert({
    where: { name: 'Cleric' },
    update: {
      hit_die: 8,
    },
    create: {
      name: 'Cleric',
      hit_die: 8,
    },
  })

  // Use an existing user as the owner.
  const author = await prisma.user.findFirst({
    select: {
      user_id: true,
    },
  })

  if (!author) {
    console.warn('No users found. Skipping Character seed.')
    return
  }

  await prisma.character.createMany({
    data: [
      {
        name: 'Thorin',
        level: 3,
        user_id: author.user_id,
        class_id: fighter.class_id,
      },
      {
        name: 'Elara',
        level: 2,
        user_id: author.user_id,
        class_id: wizard.class_id,
      },
    ],
  })

  console.log('Seeded D&D classes and characters')
}
