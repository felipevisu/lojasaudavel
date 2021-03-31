import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useCommerce } from '../../framework'

export function Recuperar(){
  const { auth } = useCommerce()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSucess] = useState(false)
  const [errors, setErrors] = useState([])
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = router.query.email
    const token = router.query.token
    if(email && token && password){
      setLoading(true)
      const response = await auth.setPassword(email, password, token)
      if(response.user){
        console.log(response)
        setSucess(true)
        setErrors([])
      } else {
        setErrors(response.errors)
      }
      setLoading(false)
    }
  }

  const errors_dict = useMemo(() => {
    var errs = {}
    errors.map((error) => {
      errs[error.field] = error.message
    })
    return errs
  }, [errors])

  if(success){
    return (
      <div className="px-4">
        <div className="border p-6 mt-6 max-w-lg mx-auto">
          <h4 className="text-lg font-semibold mb-3">Bem vindo {auth.user?.firstName}</h4>
          <p className="mb-3 text-gray-700">Sua senha foi redefinida com sucesso!<br/>Continue navegando em nossa loja.</p>
          <Link href="/">
            <a className="font-semibold text-green-500 hover:text-green-600 mt-3">
              Retornar a página inicial
            </a>
          </Link>
        </div>
      </div>
    )
    
  }

  return(
    <>
      <Head>
        <title>Loja Saudável - Recuperar senha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-4">
        <div className="border p-6 mt-6 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} method="post">
            <h4 className="text-lg font-semibold">Redefinição de senha</h4>
            {errors.length > 0 &&
              <div className="mt-2 bg-red-200 roundex px-2 py-1 text-center text-red-700 rounded mb-2">
                Dados inválidos
              </div>
            }
            <div className="py-2">
              <label htmlFor="password" className="sr-only">Nova senha</label>
              <input 
                value={password}
                onChange={handleChange}
                id="password" 
                name="password" 
                type="password" 
                autoComplete="password" 
                required 
                className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500" 
                placeholder="Digite sua nova senha" 
              />
              <span className="text-sm text-red-500">{errors_dict.password}</span>
            </div>
            <div className="py-2">
              <button className="appearance-none focus:outline-none hover:bg-green-600 text-white font-semibold rounded py-2 bg-green-500 w-full">
                {loading ? 'Carregando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Recuperar