import { useCommerce } from '../../../framework'
import { Pagarme } from './Pagarme'
import { Lojista } from './Lojista'
import { useMemo, useState } from 'react'
import { formatMoney } from '../../utils'
import { useRouter } from 'next/router'

export function Payment(props){
  const router = useRouter()
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

  if(address === null){
    router.push('/checkout/endereco')
    return null
  }

  if(method === null){
    router.push('/checkout/entrega')
    return null
  }

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
    </div>
  )
}

export default Payment