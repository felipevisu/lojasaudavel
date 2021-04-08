import { useCommerce } from '../../../framework'
import { formatMoney } from '../../utils'
import { useMemo, useState } from 'react'

const METHOD = {
  CREDITCARD: "Cartão de crédito"
}

export function Review(props){
  const { cart } = useCommerce()
  const [loading, setLoading] = useState(false)
  const address = useMemo(() => cart.cart.shippingAddress, [cart.cart.shippingAddress])
  const shipping = useMemo(() => cart.cart.shippingMethod, [cart.cart.shippingMethod])
  const payment = JSON.parse(localStorage.getItem('data_payment'))

  const handleSubmit = async (e) => {
    setLoading(true)
    const extra_data = localStorage.getItem('extra_data') || {}
    const response = await cart.checkoutComplete(extra_data)
    console.log(response)
    setLoading(false)
  }

  return(
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Revisão</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 border-b pb-4 mb-4">
        <div>
          <h4 className="font-semibold mb-3">Endereço de entrega</h4>
          {address.streetAddress1}, {address.streetAddress2 && address.streetAddress2}<br/>
          {address.cityArea && `${address.cityArea} - ` }{address.city} / {address.countryArea}<br/>
          Cep: {address.postalCode}
        </div>
        <div>
          <h4 className="font-semibold mb-3">Pagamento</h4>
          <span>Total: {formatMoney(payment.total.amount)}</span><br/>
          <span>Parcelas: {payment.installments}</span><br/>
          <span>Método: {METHOD[payment.paymentMethodType]}</span>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Entrega</h4>
          <span>Serviço: {shipping.name}</span><br/>
          <span>Preço: {formatMoney(shipping.price.amount)}</span>
        </div>
      </div>
      <button onClick={handleSubmit} className="appearance-none focus:outline-none hover:bg-green-600 bg-green-500 text-white px-6 py-2 rounded font-semibold">
        {loading ? 'Carregando...' : 'Concluir pedido' }
      </button>
    </div>
  )
}

export default Review