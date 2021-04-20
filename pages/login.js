import { useRouter } from 'next/router'
import { Auth } from '../components/auth/Modal/Auth'
import { useCommerce } from '../framework'
import Head from 'next/head'

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
    <>
      <Head>
        <title>Loja Saudável - Login</title>
      </Head>
      <div className="w-96 mx-auto p-6 border rounded my-10">
        <Auth />
      </div>
    </>
  )
}

export default Login