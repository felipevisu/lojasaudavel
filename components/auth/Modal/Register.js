import { useState } from "react"
import { useAuth } from "../../../framework/auth"
import { Field, Button } from '../../ui'

export function Register(){
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

  const handleChangeConfirm = (e) => {
    setConfirmPassword(e.target.value)
    setErrors({
      ...errors,
      confirmPassword: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(fields.password === confirmPassword){
      const response = await auth.accountRegister(fields)
      const response_errors = response.data.accountRegister.accountErrors
      if(response_errors.length > 0){
        var new_errors = {}
        response_errors.forEach(error => new_errors[error.field] = error.message)
        setErrors(new_errors)
      }
    } else {
      setErrors({
        ...errors,
        confirmPassword: 'As senhas não correspondem'
      })
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="py-1">
        <Field
          id="firstName" 
          name="firstName" 
          type="text" 
          placeholder="Nome" 
          value={fields.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="py-1">
        <Field
          id="lastName" 
          name="lastName" 
          type="text" 
          placeholder="Sobrenome" 
          value={fields.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="py-1">
        <Field
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={fields.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>
      <div className="py-1">
        <Field
          id="phone" 
          name="phone" 
          type="text" 
          placeholder="Telefone" 
          value={fields.phone}
          error={errors.phone}
          onChange={handleChange}
        />
      </div>
      <div className="py-1">
        <Field
          id="password" 
          name="password" 
          type="password" 
          placeholder="Senha" 
          value={fields.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>
      <div className="py-1">
        <Field
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirme sua senha" 
          value={confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChangeConfirm}
        />
      </div>
      <div className="py-2">
        <Button type="submit" full value={loading ? 'Carregando...' : 'Cadastrar'} />
      </div>
    </form>
  )
}

export default Register