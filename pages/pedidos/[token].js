import { useQuery } from '@apollo/client';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { orderByTokenQuery } from '../../framework/orders'
import { formatMoney, formatDate } from '../../components/utils'
import { useCommerce } from '../../framework';
import Link from 'next/link';

export function Pedidos(props){
  const router = useRouter()
  const { auth } = useCommerce()
  const { loading, error, data } = useQuery(orderByTokenQuery, {
    variables: {
      token: router.query.token
    }
  })

  const address = useMemo(() => data?.orderByToken.shippingAddress, [data])

  if(loading){
    return <div className="container mx-auto px-4 py-10">Carregando...</div>
  }

  return (
    <>
      <Head>
        <title>Loja Saudável - Pedidos</title>
      </Head>
      <div className="container mx-auto px-4 py-10">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl">Pedidos nº {data.orderByToken.number}</h3>
          <span>{data.orderByToken.statusDisplay} / {data.orderByToken.paymentStatusDisplay}</span>
          </div>
          <div>
            {auth.user &&
              <Link href="/pedidos">
                <a className="text-green-500 hover:text-green-600">Ver todos os pedidos</a>
              </Link>
            }
          </div>
        </div>
        <div className="grid grid-cols-6 items-center font-semibold py-3">
          <div className="col-span-2">Produto</div>
          <div>Variante</div>
          <div>Preço</div>
          <div>Quantidade</div>
          <div>Total</div>
        </div>
        {data.orderByToken.lines.map((line) => 
          <div className="grid grid-cols-6 items-center border-t py-3">
            <div className="col-span-2 flex items-center">
              <img src={line.thumbnail.url} alt={line.productName} className="w-14 rounded mr-3" />
              <h3>
                {line.productName}
              </h3>
            </div>
            <div className="">
              {line.variantName}
            </div>
            <div className="">
              {formatMoney(line.unitPrice.gross.amount)}
            </div>
            <div className="">
              {line.quantity}
            </div>
            <div className="">
              {formatMoney(line.totalPrice.gross.amount)}
            </div>
          </div>
        )}
        <div className="grid grid-cols-6 items-center border-t py-3">
          <div className="col-span-5">
            Subtotal
          </div>
          <div>
            {formatMoney(data.orderByToken.subtotal.gross.amount)}
          </div>
        </div>
        <div className="grid grid-cols-6 items-center border-t py-3">
          <div className="col-span-5">
            Frete: {data.orderByToken.shippingMethod.name}
          </div>
          <div>
            {formatMoney(data.orderByToken.shippingPrice.gross.amount)}
          </div>
        </div>
        <div className="grid grid-cols-6 items-center border-t py-3">
          <div className="col-span-5">
            Total
          </div>
          <div>
            {formatMoney(data.orderByToken.total.gross.amount)}
          </div>
        </div>
        <div className="border-t pt-3">
          <h3 className="font-semibold">Endereço</h3>
          <p>
            {address.streetAddress1}, {address.streetAddress2} - {address.cityArea}<br/>
            {address.city} / {address.countryArea} - CEP: {address.postalCode}
          </p>
        </div>
      </div>
    </>
  )
}

export default Pedidos