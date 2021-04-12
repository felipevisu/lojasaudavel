import { useState } from 'react'
import { AddressForm } from './AddressForm'
import { Button } from '../../ui'
import { toast } from 'react-toastify';

const initialAddress = {
  streetAddress1: '',
  streetAddress2: '',
  cityArea: '',
  city: '',
  countryArea: '',
  postalCode: '',
  country: 'BR'
}

export function AddressUpdate({instance, submit, setActive}){
  const [fields, setFields] = useState({
    streetAddress1: instance.streetAddress1,
    streetAddress2: instance.streetAddress2,
    cityArea: instance.cityArea,
    city: instance.city,
    countryArea: instance.countryArea,
    postalCode: instance.postalCode,
    country: 'BR'
  })
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
    const response = await submit(instance.id, fields)
    const response_errors = response.data.accountAddressUpdate.accountErrors
    if(response_errors.length > 0){
      var new_errors = {}
      response_errors.forEach(error => new_errors[error.field] = error.message)
      setErrors({
        ...new_errors
      })
    } else {
      setActive('list')
      toast.success("Endereço atualizado com sucesso.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    setLoading(false)
  }

  return(
    <div>
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h4 className="font-semibold">Atualizar endereço</h4>
        <Button type="button" value="Voltar" size="sm" onClick={() => setActive('list')} />
      </div>
      <AddressForm 
        instance={fields}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddressUpdate