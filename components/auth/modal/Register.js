import { useState, useMemo } from "react"
import { useCommerce } from '../../../framework'

export function Register(){
  const [fields, setFields] = useState({
    email: '',
    phone: '',
    password: '',
    password_2: ''
  })
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
    if(fields.password === fields.password_2){
      const input = fields
      delete input['password_2']
      const response = await auth.register(input)
      if(response.errors.length > 0){
        setErrors(response.errors)
      } else {
        setErrors([])
      }
    } else {
      setErrors([{
        field: 'password',
        message: 'As senhas não correspondem'
      }])
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

  return(
    <form onSubmit={handleSubmit} method="post">
      {errors.length > 0 &&
        <div className="bg-red-200 roundex px-2 py-1 text-center text-red-700 rounded mb-2">
          Dados de cadastro inválidos
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
        <span className="text-sm text-red-500">{errors_dict.email}</span>
      </div>
      <div className="py-2">
        <label htmlFor="phone" className="sr-only">Telefone</label>
        <input 
          value={fields.phone}
          onChange={handleChange}
          id="phone" 
          name="phone" 
          type="text" 
          autoComplete="phone" 
          required 
          className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
          placeholder="Telefone" 
        />
        <span className="text-sm text-red-500">{errors_dict.phone}</span>
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
        <span className="text-sm text-red-500">{errors_dict.password}</span>
      </div>
      <div className="py-2">
        <label htmlFor="password_2" className="sr-only">Confirmação de senha</label>
        <input 
          value={fields.password_2}
          onChange={handleChange}
          id="password_2" 
          name="password_2" 
          type="password" 
          autoComplete="password_2" 
          required 
          className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
          placeholder="Confirmação de senha" 
        />
        <span className="text-sm text-red-500">{errors_dict.password_2}</span>
      </div>
      <div className="py-2">
        <button className="appearance-none transition transition-all focus:outline-none hover:bg-green-600 text-white font-semibold rounded py-2 bg-green-500 w-full">
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  )
}

export default Register