import { useEffect, useState } from 'react'
import { formatMoney } from '../../utils'
import { useRouter } from 'next/router'
import { Button } from '../../ui'
import Cookies from 'js-cookie'
import { checkoutShippingMethodsQuery } from '../../../framework/cart/queries'
import { useQuery } from '@apollo/client'
import { VscLoading } from 'react-icons/vsc'
import { useCart } from '../../../framework/cart'

export function Loading(){
  return(
    <div className="p-4 text-center">
      <VscLoading className="mx-auto text-4xl animate-spin text-green-500" />
      <div className="mt-2 text-xl">
        Estamos buscando opções de entrega para seu pedido.<br/>
        Aguarde alguns segundos...  
      </div>
    </div>
  )
}

export function Shipping(props){
  const router = useRouter()
  const cart = useCart()
  const [selected, setSelected] = useState(cart.cart.shippingMethod?.id)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setSelected(e.target.value)
    setErrors([])
  }

  const { loading, data: shippingMethods, refetch } = useQuery(checkoutShippingMethodsQuery, {
    variables: {
      token: Cookies.get("checkoutToken")
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    refetch()
  }, [cart.cart.lines])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(selected){
      setSubmitLoading(true)
      const response = await cart.checkoutShippingMethodUpdate(selected)
      if(response.data.checkoutShippingMethodUpdate.checkout){
        router.push('/checkout/pagamento')
      } else {
        setSubmitLoading(false)
      }
    } else {
      setErrors([{field: "", message: "Selecione uma das opções"}])
    }
  }

  if(cart.cart.shippingAddress === null){
    router.push('/checkout/endereco')
    return null
  }

  if(loading){
    return <Loading />
  }
  
  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Métodos de entrega</h3>
        <span className="text-sm">Clique no método de entrega desejado para selecioná-lo.</span>
      </div>
      { errors &&
        errors.map((error, key) =>
          <div key={key} className="bg-red-100 border border-red-200 text-red-800 rounded px-4 py-2 mb-2">{error.message}</div>
        )
      }
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
          {shippingMethods.checkout.availableShippingMethods.map((method, key) => 
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
                Prazo: {method.minimumDeliveryDays} {method.minimumDeliveryDays > 1 ? "dias úteis" : "dia útil"}<br/>
                Preço: {formatMoney(method.price.amount)}
              </div>
            </label>
          )}  
        </div>
        <Button type="submit" value={
          <span className="flex items-center">
            {submitLoading
              ? <>
                  <VscLoading className="animate-spin" />
                  <span className="ml-2">Carregando...</span>
                </>
              : <span className="ml-2">Prosseguir com o pagamento</span>
            }
          </span>
        }/>
      </div>
    </form>
  )
}

export default Shipping