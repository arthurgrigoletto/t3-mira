import { prisma } from '~/server/db'
import { groupFactory } from '~/server/factories/groupFactory'
import { participantFactory } from '~/server/factories/participantFactory'

async function main() {
  await prisma.group.deleteMany()
  await prisma.participant.deleteMany()

  const group = await prisma.group.upsert({
    where: {
      slug: 'grupo-teste',
    },
    update: {},
    create: groupFactory.build(),
  })

  await prisma.participant.createMany({
    data: [
      participantFactory.build({
        group_id: group.id,
        email: 'arthur.grigoletto.lima@gmail.com',
        name: 'Arthur Grigoletto',
      }),
      participantFactory.build({
        group_id: group.id,
        email: 'thurlimaa@gmail.com@gmail.com',
        name: 'Arthur Lima',
      }),
      ...participantFactory.buildList(9, {
        group_id: group.id,
      }),
    ],
    skipDuplicates: true,
  })

  console.log('🌱 Run seed successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
