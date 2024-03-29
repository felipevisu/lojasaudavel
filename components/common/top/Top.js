import Link from "next/link";
import { FiFacebook, FiInstagram } from "react-icons/fi"

export function Top(props){
  return (
    <div className="hidden lg:block border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-3 text-sm font-semibold text-gray-700">
          {/*
          <div>
            Vendido e entregue por: Casa Nature - Guaxupé/MG
          </div>
          */}
          
          <div className="flex justify-self-end -mr-2">
            <span className="px-2">
              <Link href="/conta">
                <a className="transition hover:text-green-500">Minha conta</a>
              </Link>
            </span>
            <span className="px-2">
              <Link href="/pedidos">
                <a className="transition hover:text-green-500">Meus pedidos</a>
              </Link>
            </span>
            <span className="px-2">
              <a href="https://www.facebook.com/lojasaudavel.com.br" rel="noopener" target="_blank" className="flex items-center">
                <FiFacebook className="mr-1" /><span>Facebook</span>
              </a>
            </span>
            <span className="px-2">
              <a href="https://www.instagram.com/lojasaudavel.com.br/" rel="noopener" target="_blank" className="flex items-center">
                <FiInstagram className="mr-1" /><span>Instagram</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top