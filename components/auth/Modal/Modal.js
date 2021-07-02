import { FiX } from 'react-icons/fi'
import { Auth } from './Auth'
import { useAuth } from '../../../framework/auth'


export function Modal(props){
  const auth = useAuth()

  return (
    <div className={` ${auth.open ? 'block' : 'hidden'} fixed z-50 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="min-h-screen text-center block px-4">
        <div onClick={() => auth.setOpen(false)} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block bg-white text-left overflow-hidden shadow-xl transform transition-all p-10 my-8 align-middle max-w-md w-full">
          <FiX onClick={() => auth.setOpen(false)} className="cursor-pointer absolute top-6 right-6 text-xl" />
          <Auth />
        </div>
      </div>
    </div>
  )
}

export default Modal