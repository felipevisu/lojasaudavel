import { useState } from 'react'
import { useCommerce } from '../../../framework'

function SubMenu({ items }){
  return(
    <div className="absolute transform -translate-x-1/2 left-1/2 z-50 w-64">
      <div className="p-4 bg-white shadow-lg rounded-md border border-gray-200">
        {items.map(item => 
          <div className="h-8">{item.name}</div>
        )}
      </div>
    </div>
  )
}

function MenuItem(props){
  const [open, setOpen] = useState(false)
  
  return(
    <div className="relative px-2" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a className="font-semibold">{props.name}</a>
      {
        props.children.length > 0 && <span></span>
      }
      {
        open && props.children.length > 0 && <SubMenu items={props.children} />
      }
    </div>
  )
}

export function Navbar(props){
  const { menu } = useCommerce()

  if(!menu){
    return null
  }

  return(
    <div className="container mx-auto py-5">
      <nav className="flex flex-wrap -mx-2">
        <div className="relative px-2">
          <a className="font-semibold">Início</a>
        </div>
        {menu.items.map((item, key) => 
          <MenuItem key={key} {...item} />
        )}
      </nav>
    </div>
    
  )
}

export default Navbar