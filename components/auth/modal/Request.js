import { useState, useMemo } from "react"
import { useCommerce } from '../../../framework'


export function Request(){
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSucess] = useState(false)
  const { auth } = useCommerce()

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await auth.requestPasswordReset(email)
    if(response.errors.length > 0){
      setErrors(response.errors)
    } else {
      setSucess(true)
      setErrors([])
    }
    setLoading(false)
  }

  const errors_dict = useMemo(() => {
    var errs = {}
    errors.map((error) => {
      errs[error.field] = error.message
    })
    return errs
  }, [errors])

  if(success){
    return(
      <div className="text-center">
        <h4 className="text-lg font-semibold">Email enviado!</h4>
        <p>As instruções para redefinição de senha foram enviadas no seu email. Caso não encontre, verifique também a caixa de span.</p>
      </div>
    )
  }

  return(
    <form onSubmit={handleSubmit} method="post">
      {errors.length > 0 &&
        <div className="bg-red-200 roundex px-2 py-1 text-center text-red-700 rounded mb-2">
          Dados inválidos
        </div>
      }
      <div className="py-2">
        <p className="mb-3 text-gray-500 text-center">Informe seu email no campo abaixo e nós lhe enviaremos um link para redefinição de senha.</p>
        <label htmlFor="email" className="sr-only">Email</label>
        <input 
          value={email}
          onChange={handleChange}
          id="email" 
          name="email" 
          type="email" 
          autoComplete="email" 
          required 
          className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
          placeholder="Email" 
        />
        <span className="text-sm text-red-500">{errors_dict.email}</span>
      </div>
      <div className="py-2">
        <button className="appearance-none transition transition-all focus:outline-none hover:bg-green-600 text-white font-semibold rounded py-2 bg-green-500 w-full">
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}

export default Request