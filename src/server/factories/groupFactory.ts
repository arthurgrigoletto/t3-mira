import { faker } from '@faker-js/faker'
import { Group } from '@prisma/client'
import { Factory } from 'fishery'

import * as Slug from '../helpers/slugify'

export const groupFactory = Factory.define<Group>(({ params }) => {
  const { name: paramsName, ...rest } = params
  const name = `Familia ${paramsName || faker.name.lastName()}`
  const slug = Slug.createFromText(name)

  return {
    administrator_id: 'user_2NyhtAqBWMSEE6eqVXGMKRfA4LC',
    administrator_email: 'arthur.grigoletto.lima@gmail.com',
    created_at: new Date(),
    draw_date: null,
    event_date: faker.date.soon(30),
    id: faker.datatype.uuid(),
    limit_value: faker.datatype.number({ max: 200, min: 50 }),
    name,
    slug,
    start_value: faker.datatype.number({ max: 50 }),
    updated_at: new Date(),
    ...rest,
  }
})
