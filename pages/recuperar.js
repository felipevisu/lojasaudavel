import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useCommerce } from '../framework'
import { Field, Button } from '../components/ui'


export function Recuperar(){
  const { auth } = useCommerce()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSucess] = useState(false)
  const [errors, setErrors] = useState({
    password: '',
    password_2: ''
  })
  const [nonFieldError, setNonFieldError] = useState('')
  const [fields, setFields] = useState({
    password: '',
    password_2: ''
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
    const email = router.query.email
    const token = router.query.token

    if(email && token){
      setLoading(true)
      if(fields.password === fields.password_2){
        const response = await auth.setPassword(email, fields.password, token)
        const errors = response.data.setPassword.accountErrors
        if(errors.lenght === 0){
          setSucess(true)
        } else {
          var new_errors = {}
          errors.forEach(error => new_errors[error.field] = error.message)
          setErrors(new_errors)
        }
      } else {
        setErrors({
          ...errors,
          password: 'As senhas não correspondem'
        })
      }
      setLoading(false)
    } else {
      setNonFieldError("Não é possível redefinir sua senha, solicite um novo link.")
    }

  }

  if(success){
    return (
      <div className="px-4 py-10">
        <div className="border p-6 max-w-lg mx-auto rounded">
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

      <div className="px-4 py-10">
        <div className="border rounded p-6 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} noValidate>
            <h4 className="text-lg font-semibold">Redefinição de senha</h4>
            {
              nonFieldError &&
              <div className="my-2 text-sm border border-red-200 bg-red-100 px-3 py-2 text-red-800 rounded">
                {nonFieldError}
              </div>
            }
            <div className="py-1">
              <Field 
                value={fields.password}
                onChange={handleChange}
                id="password" 
                name="password" 
                type="password" 
                placeholder="Nova senha" 
              />
            </div>
            <div className="py-1">
              <Field
                value={fields.password_2}
                onChange={handleChange}
                id="password_2" 
                name="password_2"
                type="password" 
                placeholder="Confimação de senha"
              />
            </div>
            <div className="py-2">
              <Button type="submit" full value={loading ? 'Carregando...' : 'Enviar'} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Recuperar