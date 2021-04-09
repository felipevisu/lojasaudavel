import { Container } from '../components/auth/Container'
import Head from 'next/head'

export function Conta(props){
  return (
    <Container>
      <Head>
        <title>Loja Saudável - Minha conta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Container>
  )
}

export default Conta