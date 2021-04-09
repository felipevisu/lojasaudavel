import { useCommerce } from '../../../framework'
import { Pagarme } from './Pagarme'
import { Lojista } from './Lojista'
import { useMemo, useState } from 'react'
import { formatMoney } from '../../utils'

export function Payment(props){
  const { cart } = useCommerce()
  const [selected, setSelected] = useState('pagarme')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const changeMethod = (value) => {
    setSelected(value)
  }

  const address = useMemo(() => cart.cart?.shippingAddress, [cart.cart?.shippingAddress])
  const method = useMemo(() => cart.cart?.shippingMethod, [cart.cart?.shippingMethod])

  return(
    <div>
      <h3 className="font-bold text-xl mb-3">Pagamento</h3>
      <div className="border-b pb-2 mb-4">
        <div className="my-1">
          <label className="flex items-center">
            <input className="text-green-500 mr-1" type="radio" checked={selected === "pagarme"} name="place" value="pagarme" onChange={handleChange} />
            <span>Pagar agora no site</span>
          </label>
        </div>
        <div className="my-1">
          <label className="flex items-center">
            <input className="text-green-500 mr-1" type="radio" checked={selected === "lojista"} name="place" value="lojista" onChange={handleChange} />
            <span>Pagar na entrega/retirada</span>
          </label>
        </div>
      </div>
      
      {selected === 'pagarme' &&  <Pagarme changeMethod={changeMethod} />}
      {selected === 'lojista' &&  <Lojista />}

      <div className="grid grid-cols-2 border-t mt-4 pt-8">
        <div>
          <h5 className="font-semibold">Endereço de entrega</h5>
          {address.streetAddress1}, {address.streetAddress2 && address.streetAddress2}<br/>
          {address.cityArea && `${address.cityArea} - ` }{address.city} / {address.countryArea}<br/>
          Cep: {address.postalCode}
        </div>
        <div>
          <h5 className="font-semibold">Método de entrega</h5>
          Serviço: {method.name}<br/>
          Preço: {formatMoney(method.price.amount)}
        </div>
      </div>
    </div>
  )
}

export default Payment