import { type NextPage } from 'next'
import { api } from '~/utils/api'

const Groups: NextPage = () => {
  const { data } = api.groups.getAll.useQuery()

  return <h1>Groups: {data?.groups.length}</h1>
}

export default Groups
