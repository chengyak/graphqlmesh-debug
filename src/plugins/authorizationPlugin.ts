import { useGenericAuth, ResolveUserFn } from '@envelop/generic-auth'

type User = {
  id: string
}

// placeholder for auth later, for now, make sure there is a token
const resolveUserFn: ResolveUserFn<User> = context  => {
  console.log('check user authoriaztion token')

  if (context['req']['headers']['authorization'] != undefined) {
    return {id: context['req']['headers']['authorization']}
  } 
  else {
    console.log("authorization failed")
  }
}

const authPlugin = useGenericAuth({
  resolveUserFn,
  mode: 'protect-all'
})

export default authPlugin