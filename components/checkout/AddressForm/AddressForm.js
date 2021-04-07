import { useState } from 'react'
import { useCommerce } from '../../../framework'

const initialAddress = {
  streetAddress1: '',
  streetAddress2: '',
  cityArea: '',
  city: '',
  countryArea: '',
  postalCode: '',
  country: 'BR'
}

export function AddressForm(props){
  const { auth, cart } = useCommerce()
  const [fields, setFields] = useState(auth.user.defaultShippingAddress || initialAddress)

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await cart.checkoutShippingAddressUpdate(fields)
    console.log(response)
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-6 border-b pb-6 mb-6">
        <div className="col-span-3">
          <label htmlFor="streetAddress1" className="sr-only">Endereço</label>
          <input 
            value={fields.streetAddress1}
            onChange={handleChange}
            id="streetAddress1" 
            name="streetAddress1" 
            type="text" 
            autoComplete="streetAddress1" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Endereço" 
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="streetAddress2" className="sr-only">Número</label>
          <input 
            value={fields.streetAddress2}
            onChange={handleChange}
            id="streetAddress2" 
            name="streetAddress2" 
            type="text" 
            autoComplete="streetAddress2" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Número" 
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="cityArea" className="sr-only">Bairro</label>
          <input 
            value={fields.cityArea}
            onChange={handleChange}
            id="cityArea" 
            name="cityArea" 
            type="text" 
            autoComplete="cityArea" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Bairro" 
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="city" className="sr-only">Cidade</label>
          <input 
            value={fields.city}
            onChange={handleChange}
            id="city" 
            name="city" 
            type="text" 
            autoComplete="city" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Cidade" 
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="countryArea" className="sr-only">Estado</label>
          <input 
            value={fields.countryArea}
            onChange={handleChange}
            id="countryArea" 
            name="countryArea" 
            type="text" 
            autoComplete="countryArea" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Estado" 
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="postalCode" className="sr-only">Código postal (CEP)</label>
          <input 
            value={fields.postalCode}
            onChange={handleChange}
            id="postalCode" 
            name="postalCode" 
            type="text" 
            autoComplete="postalCode" 
            required 
            className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
            placeholder="Código postal (CEP)" 
          />
        </div>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold uppercase px-8 py-3 rounded">Prosseguir com o frete</button>
    </form>
  )
}

export default AddressForm