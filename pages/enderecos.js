import { Container } from '../components/auth/Container'
import Head from 'next/head'
import { Addresses } from '../components/auth/Addresses'


export function Enderecos(props){
  return (
    <Container>
      <Head>
        <title>Loja Saudável - Endereços</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Addresses />
    </Container>
  )
}

export default Enderecos