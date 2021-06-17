import Head from 'next/head'
import { Container } from '../components/auth/Container'

export function Cancel(props){
  return(
    <>
      <Head>
        <title>Loja Saudável - Cancelamento de pedidos</title>
      </Head>
      <Container>
        <iframe className="cancel-form" src='https://lojasaudavel.desk360.com.br/final/external/cancelamento?template=1' frameborder='0' width='100%'></iframe>
      </Container>
    </>
  )
}

export default Cancel