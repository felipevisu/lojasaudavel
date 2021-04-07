import Head from 'next/head'

import { CheckoutContainer } from '../../components/checkout'

export default function CheckoutShipping() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Entrega</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutContainer>
        entrega
      </CheckoutContainer>
    </>
  )
}