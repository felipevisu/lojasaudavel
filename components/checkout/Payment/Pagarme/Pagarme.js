import { useState } from 'react'
import { Field } from '../../../ui'

export function Pagarme(props){
  const [fields, setFields] = useState({
    document: '',
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({
    document: '',
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.targer.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.targer.name]: ""
    })
  }

  return(
    <div className="grid grid-cols-4 gap-4">
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
          id="name"
          name="name"
          value={fields.name}
          error={errors.name}
          onChange={handleChange}
          placeholder="José da Silva"
        />
      </div>
      <div className="col-span-2">
        <Field
          label="Número do cartão"
          id="cardNumber"
          name="cardNumber"
          value={fields.cardNumber}
          error={errors.cardNumber}
          onChange={handleChange}
          placeholder="4111-1111-1111-1111"
        />
      </div>
      <div className="col-span-1">
        <Field
          label="Validade"
          id="expirationDate"
          name="expirationDate"
          value={fields.expirationDate}
          error={errors.expirationDate}
          onChange={handleChange}
          placeholder="05/24"
        />
      </div>
      <div className="col-span-1">
        <Field
          label="Código"
          id="cvv"
          name="cvv"
          value={fields.cvv}
          error={errors.cvv}
          onChange={handleChange}
          placeholder="123"
        />
      </div>
    </div>
  )
}

export default Pagarme