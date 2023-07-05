import Head from 'next/head'
import { Container } from '../components/auth/Container'
import { Addresses } from '../components/auth/Addresses'

export function Enderecos(props){
  return (
    <>
      <Head>
        <title>Loja Saudável - Endereços</title>
      </Head>
      <Container>
        <Addresses />
      </Container>
    </>
  )
}

export default Enderecos