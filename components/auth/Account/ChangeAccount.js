import { useState } from 'react'
import { useCommerce } from '../../../framework'
import { Field, Button } from '../../ui'

export default function ChangeAccount(){
  const { auth } = useCommerce()
  const [loading, setLoading] = useState(false)

  const [fields, setFields] = useState({
    firstName: auth.user.firstName,
    lastName: auth.user.lastName,
    phone: auth.user.phone,
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })

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
    const response = await auth.accountUpdate(fields)
    const errors = response.data.accountUpdate.accountErrors
    if(errors.length > 0){
      var new_errors = {}
      errors.forEach(error => new_errors[error.field] = error.message)
      setErrors(new_errors)
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-md mb-3">Informações do usuário</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        <div>
          <Field
            id="firstName"
            name="firstName"
            label="Nome"
            value={fields.firstName}
            error={errors.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Field
            id="lastName"
            name="lastName"
            label="Sobrenome"
            value={fields.lastName}
            error={errors.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Field
            id="phone"
            name="phone"
            label="Telefone"
            value={fields.phone}
            error={errors.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button type="submit" value={loading ? 'Carregando...' : 'Salvar' } />
    </form>
  )
}