import { faker } from '@faker-js/faker'
import { Participant } from '@prisma/client'
import { Factory } from 'fishery'

import * as Slug from '~/server/helpers/slugify'

export const participantFactory = Factory.define<Participant>(({ params }) => {
  const { name: paramsName, ...rest } = params
  const name = paramsName || faker.name.fullName()
  const slug = Slug.createFromText(name)

  return {
    created_at: new Date(),
    email: faker.internet.email(),
    group_id: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    name,
    resend_email_times: 0,
    slug,
    updated_at: new Date(),
    ...rest,
  }
})
