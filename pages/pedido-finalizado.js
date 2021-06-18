import Head from 'next/head'
import Finalized from '../components/checkout/Finalized/Finalized'

export default function Complete() {

  return (
    <>
      <Head>
        <title>Loja Saudável - Pedido concluído com sucesso!</title>
      </Head>
      <Finalized />
    </>
  )
}