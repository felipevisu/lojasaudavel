import { Container } from '../components/auth/Container'
import Head from 'next/head'
import Account from '../components/auth/Account'

export function Conta(props){
  return (
    <>
      <Head>
        <title>Loja Saudável - Minha conta</title>
      </Head>
      <Container>
        <Account />
      </Container>
    </>
  )
}

export default Conta