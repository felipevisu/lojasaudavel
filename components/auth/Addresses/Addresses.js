import AddressList from './AddressList'
import AddressCreate from './AddressCreate'
import AddressUpdate from './AddressUpdate'
import { useState } from 'react'
import { useAuth } from "../../../framework/auth"

export function Addresses(){
  const auth = useAuth()
  const [active, setActive] = useState('list')
  const [instance, setInstance] = useState(null)

  const setUpdate = (id) => {
    const address = auth.addresses.find(addr => addr.id === id)
    setInstance(address)
    setActive('update')
  }

  return(
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Endereços</h3>
      </div>
      {active === 'list' && <AddressList addresses={auth.addresses} setUpdate={setUpdate} setActive={setActive} addressDelete={auth.accountAddressDelete} />}
      {active === 'create' && <AddressCreate submit={auth.accountAddressCreate} setActive={setActive} />}
      {active === 'update' && <AddressUpdate submit={auth.accountAddressUpdate} setActive={setActive} instance={instance} />}
    </div>
  )
}

export default Addresses