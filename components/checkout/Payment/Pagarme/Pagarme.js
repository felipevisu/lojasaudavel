import { useState } from 'react'
import { Field } from '../../../ui'
import { validatePagarme } from './utils'

function isValid(data){
  if(
    !data.card_cvv || !data.card_expiration_date || !data.card_holder_name || !data.card_number || !data.document
  ){
    return false
  } else {
    return true
  }
  
}

export function Pagarme(props){
  const [loading, setLoading] = useState(false)

  const [fields, setFields] = useState({
    document: '',
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: ''
  })

  const [errors, setErrors] = useState({
    document: '',
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: ''
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const card = await validatePagarme(fields)
    if(isValid(card)){
      console.log('vai dar bom')
    } else {
      delete card["brand"]
      var new_errors = {}
      Object.keys(card).forEach(function(key) {
        if(!card[key]){
          new_errors[key] = "Valor inválido"
        } else {
          new_errors[key] = ""
        }
      });
      setErrors(new_errors)
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-4 gap-4 mb-4 border-b pb-4">
        <div className="col-span-2">
          <Field
            label="Documento (CPF ou CNPJ)"
            id="document"
            name="document"
            value={fields.document}
            error={errors.document}
            onChange={handleChange}
            placeholder="123.456.789-10"
          />
        </div>
        <div className="col-span-2">
          <Field
            label="Nome (como aparece no cartão)"
            id="card_holder_name"
            name="card_holder_name"
            value={fields.card_holder_name}
            error={errors.card_holder_name}
            onChange={handleChange}
            placeholder="José da Silva"
          />
        </div>
        <div className="col-span-2">
          <Field
            label="Número do cartão"
            id="card_number"
            name="card_number"
            value={fields.card_number}
            error={errors.card_number}
            onChange={handleChange}
            placeholder="4111-1111-1111-1111"
          />
        </div>
        <div className="col-span-1">
          <Field
            label="Validade"
            id="card_expiration_date"
            name="card_expiration_date"
            value={fields.card_expiration_date}
            error={errors.card_expiration_date}
            onChange={handleChange}
            placeholder="05/24"
          />
        </div>
        <div className="col-span-1">
          <Field
            label="Código"
            id="card_cvv"
            name="card_cvv"
            value={fields.card_cvv}
            error={errors.card_cvv}
            onChange={handleChange}
            placeholder="123"
          />
        </div>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Carregando...' : 'Finalizar' }
      </button>
    </form>
  )
}

export default Pagarme