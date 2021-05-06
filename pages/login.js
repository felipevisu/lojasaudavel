import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Auth } from '../components/auth/Modal/Auth'
import { useCommerce } from '../framework'
import Head from 'next/head'

export function Login(props){
  const { auth } = useCommerce()
  const router = useRouter()

  useEffect(() => {
    if(auth.user){
      if(router.query.next){
        router.push(router.query.next)
      } else {
        router.push('/')
      }
    }
  }, [auth.user])

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