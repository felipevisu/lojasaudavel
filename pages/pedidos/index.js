import { Container } from '../../components/auth/Container'
import { useQuery } from '@apollo/client';
import Head from 'next/head'
import Link from 'next/link'
import { ordersQuery } from '../../framework/orders'
import { formatMoney, formatDate } from '../../components/utils'

export function Pedidos(props){
  const { loading, error, data } = useQuery(ordersQuery)

  return (
    <Container>
      <Head>
        <title>Loja Saudável - Pedidos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-3 pb-3 border-b">
        <h3 className="font-bold text-xl">Pedidos</h3>
      </div>
      {!loading &&
        <div className="">
          <div className="grid grid-cols-6 py-3 font-semibold px-3">
            <div>Número</div>
            <div className="col-span-2">Data</div>
            <div>Total</div>
            <div>Entrega</div>
            <div>Pagamento</div>
          </div>
          {data.me.orders.edges.map(({node: order}) =>
            <Link key={order.id} href={`/pedidos/${order.token}`}>
              <a>
                <div className="grid grid-cols-6 border-t py-3 hover:bg-gray-100 px-3">
                  <div>{order.number}</div>
                  <div className="col-span-2">{formatDate(order.created)}</div>
                  <div>{formatMoney(order.total.gross.amount)}</div>
                  <div>{order.statusDisplay}</div>
                  <div>{order.paymentStatusDisplay}</div>
                </div>
              </a>
            </Link>
          )}
        </div>
      }
    </Container>
  )
}

export default Pedidos