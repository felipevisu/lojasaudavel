import { useState } from 'react'
import { useCommerce } from '../../../framework'
import { AddressForm } from './AddressForm'
import { AddressList } from './AddressList'

export function Address(props){
  const { auth, cart } = useCommerce()

  const [active, setActive] = useState(auth.user?.addresses.length > 0 ? 'list' : 'form')

  return (
    <div>
      <h3 className="font-bold text-xl mb-3">Endereço de entrega</h3>
      {
        cart.cart.shippingAddress && 
        <div className="bg-gray-100 p-4 rounded border">
          <h5 className="font-semibold">Endereço atual:</h5>
          <span>
            {cart.cart.shippingAddress.streetAddress1} {cart.cart.shippingAddress.streetAddress2 && cart.cart.shippingAddress.streetAddress2}, 
          </span>
          <span className="pl-2">
            {cart.cart.shippingAddress.cityArea && `${cart.cart.shippingAddress.cityArea} - ` }{cart.cart.shippingAddress.city} / {cart.cart.shippingAddress.countryArea}
          </span>
          <span className="block">
            Cep: {cart.cart.shippingAddress.postalCode}
          </span>
        </div>
      }
      <div className="mt-4">
        {active === 'form' && <AddressForm setActive={setActive} />}
        {active === 'list' && <AddressList setActive={setActive} />}
      </div>
    </div>
  )
}

export default Address