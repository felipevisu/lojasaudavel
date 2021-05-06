import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/ui'
import { useEffect } from 'react'
import { useCommerce } from '../framework'

export default function Complete() {
  const { cart } = useCommerce()

  useEffect(() => {
    cart.clearCart()
  }, [])

  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Concluído com sucesso!</title>
      </Head>
      <div className="container mx-auto max-w-screen-md px-4 py-8 xl:py-14 text-center">
        <h2 className="text-5xl">
          <span>Seu pedido foi</span><br/>
          <span className="font-bold">concluído com sucesso!</span>
        </h2>
        <div className="py-4">
          <hr/>
        </div>
        <p className="text-xl mb-4">As informações sobre o pagamento e processo de entrega estarão disponíveis em seu email.</p>
        <div>
          <span className="px-1 my-2">
            <Link href="/">
              <Button value="Continue comprando" />
            </Link>
          </span>
          <span className="px-1 my-2">
            <Link href="/pedidos">
              <Button value="Acesse sua página de pedidos" outline />
            </Link>  
          </span>
        </div>
      </div>
    </>
  )
}