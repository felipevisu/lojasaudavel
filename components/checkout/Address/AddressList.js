import { useState, useMemo } from 'react'
import { useCommerce } from '../../../framework'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'

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
  const { auth, cart } = useCommerce()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const addresses = useMemo(() => auth.user.addresses)

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  console.log(cart)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if(!selected && cart.cart.shippingAddress && cart.cart.billingAddress){
      router.push('/checkout/entrega')
    } else {
      var address = {...addresses.find(addr => addr.id === selected)}
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
      <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
        <div className="border rounded flex items-center hover:bg-gray-50 cursor-pointer" onClick={() => props.setActive('form')}>
          <div className="text-center w-full text-center">
            <FiPlus className="mx-auto text-xl" />
            <span className="font-semibold">Adicionar novo</span>
          </div>
        </div>
        {addresses.map((address, key) =>
          <AddressItem key={key} handleChange={handleChange} selected={selected} {...address} />
        )}
      </div>
      <button disabled={!selected && !cart.cart.shippingAddress && !cart.cart.billingAddress} type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Carregando...' : 'Prosseguir com o frete' }
      </button>
    </form>
  )
}

export default AddressList