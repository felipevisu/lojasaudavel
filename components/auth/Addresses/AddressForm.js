import { useRouter } from 'next/router';
import { useState } from 'react'
import { useCommerce } from '../../../framework'
import { Field } from '../../ui'

const initialAddress = {
  streetAddress1: '',
  streetAddress2: '',
  cityArea: '',
  city: '',
  countryArea: '',
  postalCode: '',
  country: 'BR'
}

function getErrors(errors){
  var errorDict = {}
  errors.forEach(error => {
    errorDict[error.field] = error.message
  });
  return errorDict
}

export function AddressForm({instance}){
  const { auth } = useCommerce()
  const [fields, setFields] = useState(instance)
  const [errors, setErrors] = useState(initialAddress)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-center  mb-4 justify-between">
        <h3 className="font-bold text-md">Adicionar novo endereço</h3>
        {
          auth.user.addresses.length > 0 && <button className="bg-green-500 text-sm font-semibold text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => props.setActive('list')}>Voltar para lista</button>
        }
      </div>
      
      <div className="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
        <div className="col-span-3">
          <Field 
            label="Endereço"
            id="streetAddress1"
            name="streetAddress1" 
            type="text" 
            onChange={handleChange}
            value={fields.streetAddress1}
            error={errors.streetAddress1}
          />
        </div>
        <div className="col-span-1">
          <Field 
            label="Número"
            id="streetAddress2"
            name="streetAddress2" 
            type="text" 
            onChange={handleChange}
            value={fields.streetAddress2}
            error={errors.streetAddress2}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Bairro"
            id="cityArea"
            name="cityArea" 
            type="text" 
            onChange={handleChange}
            value={fields.cityArea}
            error={errors.cityArea}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Cidade"
            id="city"
            name="city" 
            type="text" 
            onChange={handleChange}
            value={fields.city}
            error={errors.city}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Estado"
            id="countryArea"
            name="countryArea" 
            type="text" 
            onChange={handleChange}
            value={fields.countryArea}
            error={errors.countryArea}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="CEP"
            id="postalCode"
            name="postalCode" 
            type="text" 
            onChange={handleChange}
            value={fields.postalCode}
            error={errors.postalCode}
          />
        </div>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Carregando...' : 'Prosseguir com o frete' }
      </button>
    </form>
  )
}

export default AddressForm