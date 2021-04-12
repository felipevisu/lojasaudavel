import { useCommerce } from '../../../framework'
import { formatMoney } from '../../utils'

function Line(props){
  return(
    <div className="flex mt-4">
      <div className="flex-none">
        {props.variant.media.length > 0
        ? 
          <img src={props.variant.media[0].url} className="w-14 rounded" />
        :
          <img src={props.variant.product.thumbnail?.url} className="w-14 rounded" />
        }
      </div>
      <div className="pl-2">
        <h5 className="font-semibold">
          {props.variant.product.name} {props.variant.name && <span>({props.variant.name})</span>}
        </h5>
        <div className="text-sm font-semibold text-gray-600"> 
          {formatMoney(props.variant.pricing.price.gross.amount)} / Quantidade: {props.quantity}
        </div>
      </div>
    </div>
  )
}

export function Sumary(props){
  const { cart } = useCommerce()

  return(
    <div className="bg-gray-100 p-6 rounded border">
      <h4 className="font-semibold text-xl border-b pb-3">Resumo</h4>
      <div>
        {cart.cart.lines.map((line, key) => 
          <Line key={key} {...line} />
        )}
      </div>
      <div className="text-lg text-gray-600 border-t mt-4 pt-4">
        <div className="flex justify-between my-1">
          <span>Subtotal</span>
          <span className="font-semibold">{formatMoney(cart.cart.subtotalPrice.gross.amount)}</span>
        </div>
        <div className="flex justify-between my-1">
          <span>Entrega</span>
          <span className="font-semibold">{formatMoney(cart.cart.shippingPrice.gross.amount)}</span>
        </div>
        {cart.cart.voucherCode &&
          <div className="flex justify-between my-1">
            <span>Desconto</span>
            <span className="font-semibold">{formatMoney(cart.cart.discount.amount)}</span>
          </div>
        }
        <div className="flex justify-between my-1">
          <span>Total</span>
          <span className="font-semibold">{formatMoney(cart.cart.totalPrice.gross.amount)}</span>
        </div>
      </div>
    </div>
  )
}

export default Sumary