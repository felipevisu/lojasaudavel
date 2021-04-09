import { useState } from 'react'
import { useCommerce } from '../../../framework'
import { Field, Button } from '../../ui'

export default function ChangePassword(){
  const { auth } = useCommerce()
  const [loading, setLoading] = useState(false)

  const [fields, setFields] = useState({
    newPassword: '',
    oldPassword: '',
  })

  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: '',
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
    if(fields.newPassword === confirmPassword){
      const response = await auth.passwordChange(fields.newPassword, fields.oldPassword)
      const errors = response.data.passwordChange.accountErrors
      if(errors.length > 0){
        var new_errors = {}
        errors.forEach(error => new_errors[error.field] = error.message)
        setErrors(new_errors)
      }
    } else {
      setErrors({
        ...errors,
        confirmPassword: "As senhas não correspondem" 
      })
    }
    
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-md mb-3">Alterar senha</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Field
            id="oldPassword"
            name="oldPassword"
            label="Senha antiga"
            type="password"
            value={fields.oldPassword}
            error={errors.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <Field
            id="newPassword"
            name="newPassword"
            label="Nova senha"
            type="password"
            value={fields.newPassword}
            error={errors.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            label="Confirme sua senha"
            type="password"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChangeConfirm}
          />            
        </div>
      </div>
      <Button type="submit" value={loading ? 'Carregando...' : 'Alterar' } />
    </form>
  )
}