import Head from 'next/head'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { Empty } from '../components/checkout/Empty'
import { formatMoney } from '../components/utils'
import { useRouter } from 'next/router'
import { useCart } from '../framework/cart'

function Line(props){
  const cart = useCart()

  const handleAdd = (e) => {
    const line = {
      variantId: props.variant.id,
      quantity: 1
    }
    cart.checkoutLinesAdd([line])
  }

  const handleUpdate = (e) => {
    const line = {
      variantId: props.variant.id,
      quantity: props.quantity - 1
    }
    cart.checkoutLinesUpdate([line])
  }

  const handleRemove = (e) => {
    cart.checkoutLineDelete(props.id)
  }

  return(
    <div className="grid grid-cols-5 items-center bg-gray-100 border rounded-lg p-3 mt-4">
      <div className="col-span-5 md:col-span-2 flex items-center">
        <div className="flex-none">
          {props.variant.media.length > 0
          ? 
            <img src={props.variant.media[0].url} className="w-14 rounded" />
          :
            <img src={props.variant.product.thumbnail?.url} className="w-14 rounded" />
          }
        </div>
        <div className="pl-2">
          <h5 className="font-semibold leading-4">
            {props.variant.product.name}<br/>
            <span className="text-sm">({props.variant.name})</span>
          </h5>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <button className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleUpdate}>
          <FiMinus />
        </button>
        <div className="font-semibold text-gray-600 px-2">
          {props.quantity}
        </div>
        <button className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleAdd}>
          <FiPlus />
        </button>
      </div>
      <div className="col-span-2 md:col-span-1 text-center font-bold text-gray-600">
        Total: <span className="text-green-600">{formatMoney(props.totalPrice.gross.amount)}</span>
      </div>
      <div className="text-center">
        <button className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleRemove}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}

export function Cart(props){
  const cart = useCart()
  const router = useRouter()

  if(cart.cart === null || cart.cart?.lines?.length === 0){
    return <Empty />
  }

  const handleClick = (e) => {
    const shippingAddress = cart.cart?.shippingAddress
    const shippingMethod = cart.cart?.shippingMethod
    
    if(shippingAddress && shippingMethod){
      router.push('/checkout/pagamento')
    } else {
      if (shippingAddress){
        router.push('/checkout/entrega')
      } else {
        router.push('/checkout/endereco')
      }
    }
    
    cart.setOpen(false)
  }

  return(
    <>
      <Head>
        <title>Loja Saudável - Carrinho de compras</title>
      </Head>

      <div className="container mx-auto px-4 py-6 lg:py-10 xl:max-w-screen-xl">
        <h4 className="text-xl font-bold mb-2">Carrinho de compras</h4>

        {cart.cart.lines.map((line, key) =>
          <Line key={key} {...line} />
        )}
        
        <div className="grid grid-cols-2 items-center mt-6">
          <div className="text-xl">Subtotal: {formatMoney(cart.cart.subtotalPrice.gross.amount)}</div>
          <button onClick={handleClick} className="focus:outline-none bg-green-500 hover:bg-green-600 px-6 py-2 w-full text-white font-semibold rounded uppercase">Finalizar Compra</button>
        </div>
      </div>

    </>
  )
}

export default Cart