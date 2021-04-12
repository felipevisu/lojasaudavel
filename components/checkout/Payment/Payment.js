import { useCommerce } from '../../../framework'
import { Pagarme } from './Pagarme'
import { Lojista } from './Lojista'
import { useMemo, useState } from 'react'
import { formatMoney } from '../../utils'
import { useRouter } from 'next/router'
import { Voucher } from '../Voucher'

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

      <Voucher />

      <span className="font-semibold mb-2 text-gray-500 block">Forma de pagamento</span>
      <div className="border-b pb-3 mb-3 lg:flex">
        <label className="flex items-center mr-3 py-1">
          <input className="text-green-500 mr-1" type="radio" checked={selected === "pagarme"} name="place" value="pagarme" onChange={handleChange} />
          <span>Pagar agora no site</span>
        </label>
        <label className="flex items-center py-1">
          <input className="text-green-500 mr-1" type="radio" checked={selected === "lojista"} name="place" value="lojista" onChange={handleChange} />
          <span>Pagar na entrega/retirada</span>
        </label>
      </div>

      <div className={`${selected === 'pagarme' ? 'block' : 'hidden'}`}>
        <Pagarme changeMethod={changeMethod} />
      </div>
      <div className={`${selected === 'lojista' ? 'block' : 'hidden'}`}>
        <Lojista />
      </div>
    </div>
  )
}

export default Payment