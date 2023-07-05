import Head from 'next/head'
import { Shipping } from '../../components/checkout'
import { CheckoutContainer } from '../../components/checkout'

export default function CheckoutShipping() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Entrega</title>
      </Head>
      <CheckoutContainer>
        <Shipping />
      </CheckoutContainer>
    </>
  )
}