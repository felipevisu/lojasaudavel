import { Container } from '../components/auth/Container'
import Head from 'next/head'
import Account from '../components/auth/Account'

export function Conta(props){
  return (
    <Container>
      <Head>
        <title>Loja Saudável - Minha conta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Account />
    </Container>
  )
}

export default Conta