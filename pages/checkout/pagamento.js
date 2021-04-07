import Head from 'next/head'

import { CheckoutContainer } from '../../components/checkout'

export default function CheckoutShipping() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Pagamento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutContainer>
        Pagamento
      </CheckoutContainer>
    </>
  )
}