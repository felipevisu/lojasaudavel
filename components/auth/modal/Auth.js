import { Login } from './Login'
import { Register } from './Register'
import { Request } from './Request'
import { useState } from 'react'
import { useCommerce } from '../../../framework'


export function Auth(props){
  const { auth } = useCommerce()
  const [active, setActive] = useState('login')

  return(
    <>
      <div className="mb-6">
        <img src="/logo.svg" className="w-48 mx-auto" />
      </div>
      {
        active === 'login' && 
        <div>
          <Login />
          <div className="text-center text-sm text-gray-500 mb-2">
            Esqueceu sua senha? 
            <span onClick={() => setActive('request')}  className="transition transition-all ml-1 font-bold cursor-pointer hover:text-green-500">Clique aqui.</span>
          </div>
          <div className="text-center text-gray-500 pt-3">
            Ainda não tem uma conta?<br/>
            <span onClick={() => setActive('register')} className="transition transition-all font-bold cursor-pointer hover:text-green-500">Faça seu cadastro</span>.
          </div>
        </div>
      }
      {
        active === 'register' && 
        <div>
          <Register />
          <div className="text-center text-gray-500 pt-3">
            <span onClick={() => setActive('login')} className="transition transition-all font-bold cursor-pointer hover:text-green-500">Retornar ao login</span>
          </div>
        </div>
      }
      {
        active === 'request' &&
        <div>
          <Request />
          <div className="text-center text-gray-500 pt-3">
            <span onClick={() => setActive('login')} className="transition transition-all font-bold cursor-pointer hover:text-green-500">Retornar ao login</span>
          </div>
        </div>
      }
    </>
  )
}