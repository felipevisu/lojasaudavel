import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart, FiUser, FiMenu } from "react-icons/fi"
import { Search } from "./Search"

export function Header(){

  return (
    <>
      <div className="z-40 bg-white sticky top-0 py-3 lg:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="w-1/4 lg:hidden">
              <FiMenu className="text-2xl text-green-500" />
            </div>
            <div className="w-1/2 lg:w-1/3 text-center lg:text-left">
              <Link href="/">
                <a>
                  <Image width="200px" height="45px" src="/logo.svg" alt="Loja Saudável"/>
                </a>
              </Link>
            </div>
            <div className="w-1/3 hidden lg:block">
              <Search />
            </div>
            <div className="w-1/4 lg:w-1/3 flex justify-end">
              <div className="hidden lg:flex items-center">
                <FiUser className="mr-2 text-2xl text-green-500"/>
                <span className="font-semibold">
                  Login
                </span>
              </div>
              <div className="flex items-center ml-6">
                <FiShoppingCart className="mr-2 text-2xl text-green-500"/>
                <span className="font-semibold">
                  <span className="hidden lg:inline-block">Carrinho</span> (0)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden border-b border-t">
        <div className="container mx-auto px-4" style={{marginTop: -1, marginBlock: -1}}>
          <Search />
        </div>
      </div>
      
    </>
  )
}

export default Header