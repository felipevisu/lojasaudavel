import { useState, useMemo } from "react"
import { useCommerce } from '../../../framework'
import { Field, Button } from '../../ui'

export function Request(){
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({email: ""})
  const [loading, setLoading] = useState(false)
  const [success, setSucess] = useState(false)

  const { auth } = useCommerce()

  const handleChange = (e) => {
    setEmail(e.target.value)
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await auth.requestPasswordReset(email)
    console.log(response)
    const response_errors = response.data.requestPasswordReset.accountErrors
    if(response_errors.length > 0){
      var new_errors = {}
      response_errors.forEach(error => new_errors[error.field] = error.message)
      setErrors(new_errors)
    } else {
      setSucess(true)
    }
    setLoading(false)
  }

  if(success){
    return(
      <div className="text-center">
        <h4 className="text-lg font-semibold">Email enviado!</h4>
        <p>As instruções para redefinição de senha foram enviadas no seu email. Caso não encontre, verifique também a caixa de span.</p>
      </div>
    )
  }

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="py-2">
        <p className="mb-3 text-gray-500 text-center">Informe seu email no campo abaixo e nós lhe enviaremos um link para redefinição de senha.</p>
        <Field
          value={email}
          error={errors.email}
          onChange={handleChange}
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email" 
        />
      </div>
      <div className="py-2">
        <Button type="submit" full value={loading ? 'Carregando...' : 'Enviar'}/>
      </div>
    </form>
  )
}

export default Request