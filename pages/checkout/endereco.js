import Head from 'next/head'

import { CheckoutContainer, Address } from '../../components/checkout'

export default function CheckoutAddress() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Endereço</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutContainer>
        <Address/>
      </CheckoutContainer>
    </>
  )
}