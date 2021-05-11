import { IoMdClose } from 'react-icons/io'
import { useCommerce } from '../../../framework'
import { formatMoney } from '../../utils'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from './CartBox.module.css'

function Line(props){
  const { cart } = useCommerce()

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
    <div className="border-t pt-3 mb-3">
      <div className="flex mb-3">
        <div className="flex-none">
          {props.variant.media.length > 0
          ? 
            <Image width={60} height={60} src={props.variant.media[0].url} alt={props.variant.product.name} className="w-14 rounded" />
          :
            <Image width={60} height={60} src={props.variant.product.thumbnail?.url} alt={props.variant.product.name} className="w-14 rounded" />
          }
        </div>
        <div className="pl-2">
          <h5 className="font-semibold leading-4">
            {props.variant.product.name}<br/>
            <span className="text-sm">({props.variant.name})</span>
          </h5>
          <div className="text-sm font-bold text-gray-600"> 
            Total: <span className="text-green-600">{formatMoney(props.totalPrice.gross.amount)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-gray-100 rounded px-1">
        <div className="flex-1">
          <button aria-label="Remover" className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleUpdate}>
            <FiMinus />
          </button>
          <button aria-label="Adicionar" className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleAdd}>
            <FiPlus />
          </button>
          <button aria-label="Excluir" className="appearance-none focus:outline-none hover:text-green-500 px-2 py-2" onClick={handleRemove}>
            <FiTrash2 />
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-600 px-2">
          Quantidade: {props.quantity}
        </div>
      </div>
    </div>
    
  )
}

export function Cart(){
  const { cart } = useCommerce()
  const router = useRouter()

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
      <div onClick={() => cart.setOpen(false)} className={` ${cart.open ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black z-40 opacity-50 `} />
      <div className={`${styled.sideBar} ${cart.open ? styled.open : ''}`}>
        <div className="flex items-center px-6 h-12">
          <span className="font-semibold">Carrinho</span>
          <button aria-label="Fechar" onClick={() => cart.setOpen(false)} className="focus:outline-none ml-auto mr-0"><IoMdClose /></button>
        </div>
        <div className="px-6 absolute bottom-32 top-12 pb-3 overflow-auto w-full">
          {cart.cart &&
            cart.cart?.lines.map((line, key) =>
              <Line key={key} {...line} />
            )
          }
        </div>
        <div className=" bg-gray-200 p-6 absolute bottom-0 w-full h-32">
            <div className="mb-2 text-xl text-gray-600">
              Total: <span className="font-bold">
                {
                  cart.cart 
                  ? formatMoney(cart.cart?.totalPrice.gross.amount)
                  : formatMoney(0)
                }
              </span>
            </div>
            <button aria-label="Finalizar" onClick={handleClick} className="focus:outline-none bg-green-500 hover:bg-green-600 px-6 py-2 w-full text-white font-semibold rounded uppercase">Finalizar Compra</button>
        </div>
      </div>
    </>
  )
}

export default Cart