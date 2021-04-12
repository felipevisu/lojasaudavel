import { useState } from "react"
import { useCommerce } from '../../../framework'
import { Field, Button } from '../../ui'

export function Login(){
  const [fields, setFields] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const { auth } = useCommerce()

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
    const response = await auth.login(fields.email, fields.password)
    const response_errors = response.data.tokenCreate.accountErrors
    if(response_errors.length > 0){
      var new_errors = {}
      response_errors.forEach(error => new_errors[error.field] = error.message)
      setErrors(new_errors)
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="py-1">
        <Field
          value={fields.email}
          error={errors.email}
          onChange={handleChange}
          id="email" 
          name="email" 
          type="email"
          placeholder="Email" 
        />
      </div>
      <div className="py-1">
        <Field
          value={fields.password}
          error={errors.password}
          onChange={handleChange}
          id="password" 
          name="password" 
          type="password" 
          placeholder="Senha" 
        />
      </div>
      <div className="py-2">
        <Button type="submit" full value={loading ? 'Carregando...' : 'Entrar'} />
      </div>
    </form>
  )
}

export default Login