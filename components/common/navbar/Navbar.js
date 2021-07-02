import Link from "next/link"
import { useState } from "react"
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useSite } from "../../../framework"

function getPath(props){
  if(props.category){
    return '/categorias/' + props.category.slug
  }
  if(props.collection){
    return '/colecoes/' + props.collection.slug
  }
  if(props.page){
    return '/institucional/' + props.page.slug
  }
  return '#'
}

function LinkItem(props){
  return(
    <>
      <Link href={getPath(props)}>
        <a className="font-semibold transition transition-all hover:text-green-500 flex items-center py-1">
          {props.name}
          {props.children.length > 0 && <RiArrowDropDownLine className="text-xl" />}
        </a>
      </Link>
    </>
  )
}

function MenuItem(props){

  const [show, setShow] = useState(false)

  return(
    <div className="py-3 px-3" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <LinkItem {...props} />
      {props.children.length > 0 &&
        <div className={` ${show ? 'block' : 'hidden'} z-30 py-3 mt-3 absolute w-full bg-gray-100 border-t border-b left-0`}>
          <div className="container mx-auto xl:max-w-screen-xl px-4">
            <div className="flex flex-wrap justify-center">
              {props.children.map((item) => 
                <div key={item.id} className="px-3">
                  <LinkItem {...item} />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export function Navbar(){
  const site = useSite()

  if(!site.menu){
    return null
  }

  return(
    <div className="relative border-b border-t hidden lg:block">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {site.menu?.items.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </div>
    </div>
    
  )
}

export default Navbar