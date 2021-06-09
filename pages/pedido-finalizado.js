import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/ui'
import { useEffect } from 'react'
import { useCommerce } from '../framework/'

var Barcode = require('react-barcode');

export default function Complete() {
  const { cart } = useCommerce()

  useEffect(() => {
    if(cart.order){
      cart.clearCart()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Loja Saudável - Pedido concluído com sucesso!</title>
      </Head>
      <div className="container mx-auto max-w-screen-md px-4 py-8 xl:py-14 text-center">
        <h2 className="text-5xl">
          <span>Seu pedido (#{cart?.order?.number}) foi</span><br/>
          <span className="font-bold">concluído com sucesso!</span>
        </h2>
        <hr className="my-3" />
        <p className="text-xl">As informações sobre o pagamento e processo de entrega estarão disponíveis em seu email.</p>
        {cart?.order?.paymentBillet && 
          <div className="text-center bg-gray-100 border border-gray-200 rounded p-4 my-4">
            <div className="mb-2 flex justify-center">
              <Barcode width={2} value={cart.order.paymentBillet.barcode} />
            </div>
            <a href={cart.order.paymentBillet.url} target="_blank">
              <button className="
                bg-red-500 
                hover:bg-red-600
                appearance-none
                focus:outline-none
                rounded
                font-semibold
                px-6
                py-2
                mb-2
                text-white
              ">Download do boleto</button>
            </a>
          </div>
        }
        <div>
          <span className="px-1 my-2">
            <Link href="/">
              <a>
                <Button value="Continue comprando" />
              </a>
            </Link>
          </span>
          <span className="px-1 my-2">
            <Link href="/pedidos">
              <a>
                <Button value="Acesse sua página de pedidos" outline />
              </a>
            </Link>  
          </span>
        </div>
      </div>
    </>
  )
}