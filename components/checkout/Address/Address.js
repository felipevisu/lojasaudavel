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
      <div className="mt-4">
        {active === 'form' && <AddressForm setActive={setActive} />}
        {active === 'list' && <AddressList setActive={setActive} />}
      </div>
    </div>
  )
}

export default Address