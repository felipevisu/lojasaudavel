import { useCommerce } from '../../../framework'
import { Login } from './Login'
import { Register } from './Register'
import { Request } from './Request'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

export function Modal(props){
  const { auth } = useCommerce()
  const [active, setActive] = useState('login')

  return (
    <div className={` ${auth.open ? 'block' : 'hidden'} fixed z-50 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="min-h-screen text-center block px-4">
        <div onClick={() => auth.setOpen(false)} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block bg-white text-left overflow-hidden shadow-xl transform transition-all p-10 my-8 align-middle max-w-md w-full">
          <FiX onClick={() => auth.setOpen(false)} className="cursor-pointer absolute top-6 right-6 text-xl" />
          <div className="mb-6">
            <img src="/logo.svg" className="w-48 mx-auto" />
          </div>
          {
            active === 'login' && 
            <div>
              <Login />
              <div className="text-center text-sm text-gray-500 mb-2">
                Esqueceu sua senha? 
                <span onClick={() => setActive('request')}  className="ml-1 font-bold cursor-pointer hover:text-green-500">Clique aqui.</span>
              </div>
              <div className="text-center text-gray-500 pt-3">
                Ainda não tem uma conta?<br/>
                <span onClick={() => setActive('register')} className="font-bold cursor-pointer hover:text-green-500">Faça seu cadastro</span>.
              </div>
            </div>
          }
          {
            active === 'register' && 
            <div>
              <Register />
              <div className="text-center text-gray-500 pt-3">
                <span onClick={() => setActive('login')} className="font-bold cursor-pointer hover:text-green-500">Retornar ao login</span>
              </div>
            </div>
          }
          {
            active === 'request' &&
            <div>
              <Request />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal