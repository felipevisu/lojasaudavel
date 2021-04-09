import { useRouter } from 'next/router'
import { Auth } from '../components/auth/modal/Auth'
import { useCommerce } from '../framework'

export function Login(props){
  const { auth } = useCommerce()
  const router = useRouter()

  if(auth.authLoading || auth.user){
    if(auth.user){
      router.push('/')
    }
    return <div className="container mx-auto px-4 py-10">Carregando...</div>
  }

  return(
    <div className="w-96 mx-auto p-6 border rounded my-10">
      <Auth />
    </div>
  )
}

export default Login