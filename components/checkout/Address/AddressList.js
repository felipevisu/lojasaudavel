import { useState, useMemo } from 'react'
import { useCommerce } from '../../../framework'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'

function AddressItem(props){
  return(
    <button
      onClick={() => props.handleClick(props.id)} 
      type="button" 
      value={props.id} 
      className={`${props.selected === props.id ? 'bg-green-200 border-green-300 text-green-800' : 'bg-gray-100 border-gray-200' } text-left appearance-none focus:outline-none rounded border p-4`}
    >
      <span className="block">
        {props.streetAddress1}, {props.streetAddress2 && props.streetAddress2}
      </span>
      <span className="block">
        {props.cityArea && `${props.cityArea} - ` }{props.city} / {props.countryArea}
      </span>
      <span className="block">
        Cep: {props.postalCode}
      </span>
    </button>
  )
}

export function AddressList(props){
  const router = useRouter()
  const { auth, cart } = useCommerce()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const addresses = useMemo(() => auth.user.addresses)

  const handleClick = (id) => {
    setSelected(id)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    var address = {...addresses.find(addr => addr.id === selected)}
    delete address['id']
    delete address['__typename']
    address['country'] = "BR"
    const response = await cart.checkoutShippingAddressUpdate(address)
    if(response.data.checkoutShippingAddressUpdate.checkoutErrors.length === 0){
      router.push('/checkout/entrega')
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
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
          <AddressItem key={key} handleClick={handleClick} selected={selected} {...address} />
        )}
      </div>
      <button disabled={selected === null} type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Carregando...' : 'Prosseguir com o frete' }
      </button>
    </form>
  )
}

export default AddressList