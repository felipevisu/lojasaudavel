import { Container } from '../../components/auth/Container'
import Head from 'next/head'
import Orders from '../../components/auth/Orders'
export function Pedidos(props){

  return (
    <Container>
      <Head>
        <title>Loja Saudável - Pedidos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-3 pb-3 border-b">
        <h3 className="font-bold text-xl">Pedidos</h3>
      </div>
      <Orders />
    </Container>
  )
}

export default Pedidos