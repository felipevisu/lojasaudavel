import Head from 'next/head'
import { CheckoutContainer, Payment } from '../../components/checkout'

export default function CheckoutShipping() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Pagamento</title>
      </Head>
      <CheckoutContainer>
        <Payment />
      </CheckoutContainer>
    </>
  )
}