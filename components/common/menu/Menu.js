import { IoMdClose } from 'react-icons/io'
import { useCommerce } from '../../../framework'
import styled from './Menu.module.css'
import { useState, useMemo, useEffect } from 'react'
import Link from "next/link"
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { FiUser, FiPackage, FiLogOut } from "react-icons/fi"

function LinkItem(props){
  const slug = useMemo(() => {
    if(props.item.category){
      return '/categorias/' + props.item.category.slug
    }
    if(props.item.collection){
      return '/colecoes/' + props.item.collection.slug
    }
    if(props.item.page){
      return '/institucional/' + props.item.page.slug
    }
    return '/'
  }, [props])

  return(
    <div className="flex block justify-between">
      <Link href={`${slug}`}>
        <a className="font-semibold transition transition-all hover:text-green-500 items-center">
          <span>{props.item.name}</span>
        </a>
      </Link>
      <span>{props.item.children.length > 0 && <RiArrowDropDownLine onClick={() => props.setShow(!props.show)} className="text-xl bg-gray-200 rounded-full" />}</span>
    </div>
  )
}

function MenuItem(props){

  const [show, setShow] = useState(false)

  return(
    <div className="px-3 py-2">
      <LinkItem item={props} show={show} setShow={setShow} />
      {props.children.length > 0 &&
        <div className={` ${show ? 'block' : 'hidden'} z-30 py-4 px-2 mt-2 rounded py-1 w-full bg-gray-100`}>
          <div className="">
            {props.children.map((item) => 
              <div key={item.id} className="px-3">
                <LinkItem item={item} show={show} setShow={setShow} />
              </div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export function Menu(){
  const { auth, menu, menuOpen, setMenuOpen } = useCommerce()
  const router = useRouter()

  useEffect(() => {
    if(menuOpen){
      setMenuOpen(false)
    }
  }, [router])

  return(
    <>
      <div onClick={() => setMenuOpen(false)} className={` ${menuOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black z-40 opacity-50 `} />
      <div className={`${styled.sideBar} ${menuOpen && styled.open }`}>
        <div className="flex items-center px-6 h-12">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="focus:outline-none ml-auto mr-0"><IoMdClose /></button>
        </div>
        <div className="px-3 absolute bottom-0 top-12 pb-3 overflow-auto w-full">
          <div className="grid grid-cols-2 rounded border mx-3 mb-4 text-center">
            {auth.user === null 
              ?
              <Link href="/login">
                <div className="p-2 border-r justify-center flex items-center cursor-pointer transition transition-all hover:text-green-500">
                  <FiUser className="mr-2 text-2xl text-green-500"/>
                  <span className="font-semibold">
                    Login
                  </span>
                </div>
              </Link>
              :
              <Link href="/login">
                <div className="p-2 border-r justify-center flex items-center cursor-pointer transition transition-all hover:text-green-500">
                  <FiLogOut className="mr-2 text-2xl text-green-500"/>
                  <span className="font-semibold">
                    Sair
                  </span>
                </div>
              </Link>
            }
            <Link href="/pedidos">
              <div className="p-2 flex justify-center items-center cursor-pointer transition transition-all hover:text-green-500">
                <FiPackage className="mr-2 text-2xl text-green-500"/>
                <span className="font-semibold">
                  Pedidos
                </span>
              </div>
            </Link>
          </div>
          {menu?.items.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </div>
    </>
  )
}

export default Menu