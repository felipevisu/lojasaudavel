import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { Button } from '../../ui'
import { VscLoading } from 'react-icons/vsc'
import { useAuth } from '../../../framework/auth'
import { useCart } from '../../../framework/cart'

function AddressItem(props){
  return(
    <label
      htmlFor={props.id}
      className={`flex cursor-pointer ${props.selected === props.id ? 'bg-green-200 border-green-300 text-green-800' : 'hover:border-green-200 hover:bg-green-100 bg-gray-100 border-gray-200' } text-left appearance-none focus:outline-none rounded border p-4`}
    >
      <input 
        id={props.id} 
        type="radio"
        checked={props.selected === props.id}
        onChange={props.handleChange} 
        className="text-green-500 mt-1 mr-2" 
        name="address" 
        value={props.id} 
      />
      <div>
        {props.streetAddress1}, {props.streetAddress2 && props.streetAddress2}<br/>
        {props.cityArea && `${props.cityArea} - ` }{props.city} / {props.countryArea}<br/>
        Cep: {props.postalCode}
      </div>
    </label>
  )
}

export function AddressList(props){
  const router = useRouter()
  const auth = useAuth()
  const cart = useCart()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if(!selected && cart.cart.shippingAddress && cart.cart.billingAddress){
      router.push('/checkout/entrega')
    } else {
      var address = {...auth.addresses.find(addr => addr.id === selected)}
      delete address['id']
      delete address['__typename']
      address['country'] = "BR"
      const response_1 = await cart.checkoutBillingAddressUpdate(address)
      const errors_1 = response_1.data.checkoutBillingAddressUpdate.checkoutErrors
      const response_2 = await cart.checkoutShippingAddressUpdate(address)
      const errors_2 = response_2.data.checkoutShippingAddressUpdate.checkoutErrors
      if(errors_1.length === 0 && errors_2.length === 0){
        router.push('/checkout/entrega')
      } else {
        setErrors([...errors_1, ...errors_2])
        setLoading(false)
      }
    }
  }

  return(
    <form method="post" onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <h3 className="font-bold text-md">Endereços já utilizados</h3>
        <span className="text-sm">Clique no endereço desejado para selecioná-lo</span>
      </div>

      { errors &&
        errors.map((error, key) =>
          <div key={key} className="bg-red-100 border border-red-200 text-red-800 rounded px-4 py-2 mb-2">{error.message}</div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
        <div className="border rounded flex items-center hover:bg-gray-50 cursor-pointer" onClick={() => props.setActive('form')}>
          <div className="text-center w-full text-center py-8">
            <FiPlus className="mx-auto text-xl" />
            <span className="font-semibold">Adicionar novo</span>
          </div>
        </div>
        {auth.addresses.map((address, key) =>
          <AddressItem key={key} handleChange={handleChange} selected={selected} {...address} />
        )}
      </div>
      <Button type="submit" value={
        <span className="flex items-center">
          {loading
            ? <>
                <VscLoading className="animate-spin" />
                <span className="ml-2">Carregando...</span>
              </>
            : <span className="ml-2">Prosseguir com o frete</span>
          }
        </span>
      }/>
    </form>
  )
}

export default AddressList