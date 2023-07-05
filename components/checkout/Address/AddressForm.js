import { useRouter } from 'next/router';
import { useState } from 'react'
import { useAuth } from '../../../framework/auth';
import { useCart } from '../../../framework/cart';
import { Field, Button, Select } from '../../ui'

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

export function AddressForm(props){
  const router = useRouter()
  const auth = useAuth()
  const cart = useCart()
  
  const [fields, setFields] = useState(initialAddress)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [save, setSave] = useState(true)

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
    let temp_errors = {...errors}
    delete temp_errors[e.target.name]
    setErrors(temp_errors)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()  

    const response_1 = await cart.checkoutShippingAddressUpdate(fields)
    const response_2 = await cart.checkoutBillingAddressUpdate(fields)
    const errors_1 = response_1.data.checkoutShippingAddressUpdate.checkoutErrors
    const errors_2 = response_2.data.checkoutBillingAddressUpdate.checkoutErrors

    if(errors_1.length > 0){
      setErrors(getErrors(errors_1))
    }
    if(errors_2.length > 0){
      setErrors(getErrors(errors_2))
    }

    if(save){
      const response_3 = await auth.accountAddressCreate(fields)
      const errors_3 = response_3.data.accountAddressCreate.accountErrors
      if(errors_3.length > 0){
        setErrors(getErrors(errors_3))
      }
    }

    if(errors_1.length === 0 && errors_2.length === 0){
      router.push('/checkout/entrega')
    } else {
      setLoading(false)
    }
    
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-center  mb-4 justify-between">
        <h3 className="font-bold text-md">Adicionar novo endereço</h3>
        {
          auth.addresses.length > 0 && 
          <Button size="sm" onClick={() => props.setActive('list')} value="Voltar para lista" />
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
          <Select
            label="Estado"
            id="countryArea"
            name="countryArea"
            value={fields.countryArea}
            onChange={handleChange}
            error={errors.countryArea}
            options={
              [
                {value: "", name: "Selecione um estado"},
                {value: "Acre", name: "Acre"}, 
                {value: "Alagoas", name: "Alagoas"},
                {value: "Amapá", name: "Amapá"},
                {value: "Amazonas", name: "Amazonas"},
                {value: "Bahia", name: "Bahia"},
                {value: "Ceará", name: "Ceará"},
                {value: "Distrito Federal", name: "Distrito Federal"},
                {value: "Espírito Santo", name: "Espírito Santo"},
                {value: "Goiás", name: "Goiás"},
                {value: "Maranhão", name: "Maranhão"},
                {value: "Mato Grosso", name: "Mato Grosso"},
                {value: "Mato Grosso do Sul", name: "Mato Grosso do Sul"},
                {value: "Minas Gerais", name: "Minas Gerais"},
                {value: "Pará", name: "Pará"},
                {value: "Paraíba", name: "Paraíba"},
                {value: "Paraná", name: "Paraná"},
                {value: "Pernambuco", name: "Pernambuco"},
                {value: "Piauí", name: "Piauí"},
                {value: "Rio de Janeiro", name: "Rio de Janeiro"},
                {value: "Rio Grande do Norte", name: "Rio Grande do Norte"},
                {value: "Rio Grande do Sul", name: "Rio Grande do Sul"},
                {value: "Rondônia", name: "Rondônia"},
                {value: "Roraima", name: "Roraima"},
                {value: "Santa Catarina", name: "Santa Catarina"},
                {value: "São Paulo", name: "São Paulo"},
                {value: "Sergipe", name: "Sergipe"},
                {value: "Tocantins", name: "Tocantins"}
              ]
            }
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
        <div className="col-span-4">
          <label className="inline-flex items-center">
            <input checked={save} type="checkbox" name="save" value={save} onChange={() => setSave(!save)} className="h-4 w-4 rounded text-green-500 border-gray-400"/>
            <span className="ml-2 text-gray-700">Salvar para próxima compra</span>
          </label>
        </div>
      </div>
      <Button type="submit" value={loading ? 'Carregando...' : 'Prosseguir com o frete' } />
    </form>
  )
}

export default AddressForm