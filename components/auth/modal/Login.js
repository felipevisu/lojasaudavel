import { useState } from "react"
import { useCommerce } from '../../../framework'


export function Login(){
  const [fields, setFields] = useState({email: '', password: ''})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const { auth } = useCommerce()

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await auth.login(fields.email, fields.password)
    if(response.data.tokenCreate.accountErrors.length > 0){
      setErrors(response.data.tokenCreate.accountErrors)
    } else {
      setErrors([])
    }
    setLoading(false)
  }

  return(
    <form onSubmit={handleSubmit} method="post">
      {errors.length > 0 &&
        <div className="bg-red-200 roundex px-2 py-1 text-center text-red-700 rounded mb-2">
          Dados de acesso inválidos
        </div>
      }
      <div className="py-2">
        <label htmlFor="email" className="sr-only">Email</label>
        <input 
          value={fields.email}
          onChange={handleChange}
          id="email" 
          name="email" 
          type="email" 
          autoComplete="email" 
          required 
          className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
          placeholder="Email" 
        />
      </div>
      <div className="py-2">
        <label htmlFor="senha" className="sr-only">Senha</label>
        <input 
          value={fields.password}
          onChange={handleChange}
          id="password" 
          name="password" 
          type="password" 
          autoComplete="password" 
          required 
          className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
          placeholder="Senha" 
        />
      </div>
      <div className="py-2">
        <button className="appearance-none focus:outline-none hover:bg-green-600 text-white font-semibold rounded py-2 bg-green-500 w-full">
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </div>
    </form>
  )
}

export default Login