import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../../components/ui'

export default function CheckoutShipping() {
  return (
    <>
      <Head>
        <title>Loja Saudável - Checkout - Finalizado com sucesso!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-screen-md px-4 py-8 xl:py-14 text-center">
        <h2 className="text-6xl">
          <span>Agradecemos</span><br/>
          <span className="font-bold">o seu pedido!</span>
        </h2>
        <div className="py-4">
          <hr/>
        </div>
        <p className="text-xl mb-4">Enviaremos um email assim que seu pagamento for aprovado.</p>
        <div>
          <span className="px-1">
            <Link href="/">
              <Button value="Continue comprando" />
            </Link>
          </span>
          <span className="px-1">
            <Link href="/pedidos">
              <Button value="Acesse sua página de pedidos" outline />
            </Link>  
          </span>
          
        </div>
      </div>
    </>
  )
}