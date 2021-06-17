import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiChevronDown } from  'react-icons/fi'

export function Container(props){
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(window.innerWidth > 1024){
      setOpen(true)
    }
  }, [])

  return(
    <div className="p-5 rounded border bg-gray-100">
      <div className="flex justify-between items-center" onClick={() => setOpen(!open)}>
        <h5 className="font-bold text-lg">Menu</h5>
        <button className="appearance-none focus:outline-none w-8 h-8 rounded-full text-center bg-gray-200">
          <FiChevronDown className="mx-auto" /> 
        </button>
      </div>

      <div className={open ? "block mt-3" : "hidden"}>
        <div className="my-1 text-lg">
          <Link href="/conta">
            <a>Minha conta</a>
          </Link>
        </div>
        <div className="my-1 text-lg">
          <Link href="/pedidos">
            <a>Pedidos</a>
          </Link>
        </div>
        <div className="my-1 text-lg">
          <Link href="/enderecos">
            <a>Endereços</a>
          </Link>
        </div>
        <div className="my-1 text-lg">
          <Link href="/atendimento">
            <a>Atendimento</a>
          </Link>
        </div>
        <div className="my-1 text-lg">
          <Link href="/cancelamento">
            <a>Cancelamento</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Container