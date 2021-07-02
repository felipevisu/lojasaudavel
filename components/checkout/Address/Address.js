import { useState } from 'react'
import { useAuth } from '../../../framework/auth'
import { AddressForm } from './AddressForm'
import { AddressList } from './AddressList'

export function Address(props){
  const auth = useAuth()
  const [active, setActive] = useState(auth.addresses.length > 0 ? 'list' : 'form')

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