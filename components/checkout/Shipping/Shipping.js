import { useCommerce } from '../../../framework'
import { useMemo, useState } from 'react'
import { formatMoney } from '../../utils'
import { useRouter } from 'next/router'
import { Button } from '../../ui'

export function Shipping(props){
  const router = useRouter()
  const { cart } = useCommerce()
  const [selected, setSelected] = useState(cart.cart.shippingMethod?.id)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setSelected(e.target.value)
    setErrors([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(selected){
      setLoading(true)
      const response = await cart.checkoutShippingMethodUpdate(selected)
      if(response.data.checkoutShippingMethodUpdate.checkout){
        router.push('/checkout/pagamento')
      } else {
        setLoading(false)
      } 
    } else {
      setErrors([{field: "", message: "Selecione uma das opções"}])
    }
  }

  const address = useMemo(() => cart.cart.shippingAddress, [cart.cart.shippingAddress])

  if(address === null){
    router.push('/checkout/endereco')
    return null
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Métodos de entrega</h3>
        <span className="text-sm">Clique no método de entrega desejado para selecioná-lo.</span>
      </div>
      { errors &&
        errors.map((error, key) =>
          <div className="bg-red-100 border border-red-200 text-red-800 rounded px-4 py-2 mb-2">{error.message}</div>
        )
      }
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
          {cart.cart.availableShippingMethods.map((method, key) => 
            <label
              key={key}
              htmlFor={method.id}
              className={`flex cursor-pointer ${selected === method.id ? 'bg-green-200 border-green-300 text-green-900' : 'hover:border-green-200 hover:bg-green-100 bg-gray-100 border-gray-200' } text-left appearance-none focus:outline-none rounded border p-4`}
            >
              <input 
                id={method.id} 
                checked={selected === method.id}
                onChange={handleChange} 
                type="radio" 
                className="text-green-500 mt-1 mr-2" 
                name="shipping" 
                value={method.id} 
              />
              <div>
                {method.name}<br/>
                Preço: {formatMoney(method.price.amount)}
              </div>
            </label>
          )}  
        </div>
        <Button type="submit" value={loading ? 'Carregando...' : 'Prosseguir com o pagamento'} />
      </div>
    </form>
  )
}

export default Shipping