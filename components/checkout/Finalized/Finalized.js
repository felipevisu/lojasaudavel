import Link from 'next/link'
import { Button } from '../../ui'
import { useEffect, useState } from 'react'
import { Billet } from './Billet'

export function Finalized(){
  const [order, setOrder] = useState(null)

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem('order')))
  }, [])

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-8 xl:py-14 text-center">
      <h2 className="text-5xl">
        <span>Seu pedido (#{order?.number}) foi</span><br/>
        <span className="font-bold">concluído com sucesso!</span>
      </h2>
      <p className="text-xl my-4 px-3">As informações sobre o pagamento e processo de entrega estarão disponíveis em seu email.</p>

      {order?.paymentBillet && <Billet billet={order.paymentBillet} />}

      <div>
        <span className="px-1 my-2">
          <Link href="/">
            <a>
              <Button value="Continue comprando" />
            </a>
          </Link>
        </span>
        {order
          ?
          <span className="px-1 my-2">
            <Link href={`/pedidos/${order.token}`}>
              <a>
                <Button value="Ver detalhes do pedido" outline />
              </a>
            </Link>  
          </span> 
          :
          <span className="px-1 my-2">
            <Link href="/pedidos">
              <a>
                <Button value="Acesse sua página de pedidos" outline />
              </a>
            </Link>  
          </span>
        }
      </div>
    </div>
  )
}

export default Finalized