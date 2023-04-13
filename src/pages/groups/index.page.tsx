import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import { api } from '~/utils/api'

const Groups: NextPage = () => {
  const { user } = useUser()
  const { data } = api.groups.getAll.useQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  })

  return <h1>Groups: {data?.groups.length}</h1>
}

export default Groups
