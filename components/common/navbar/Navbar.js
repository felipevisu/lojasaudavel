import Link from "next/link"
import { useMemo } from "react"
import { useCommerce } from "../../../framework"

function MenuItem(props){
  const pathname = useMemo(() => {
    if(props.category){
      return '/categorias/[slug]'
    }
    if(props.collection){
      return '/colecoes/[slug]'
    }
    if(props.page){
      return '/institucional/[slug]'
    }
  }, [props])

  const slug = useMemo(() => {
    if(props.category){
      return '/categorias/' + props.category.slug
    }
    if(props.collection){
      return '/colecoes/' + props.collection.slug
    }
    if(props.page){
      return '/institucional/' + props.page.slug
    }
  }, [props])

  return(
    <div className="px-3">
      <Link href={`${pathname}`} as={`${slug}`}>
        <a className="font-semibold">
          {props.name}
        </a>
      </Link>
    </div>
  )
}

export function Navbar(){
  const { menu } = useCommerce()

  if(!menu){
    return null
  }

  return(
    <div className="border-b border-t hidden lg:block">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center">
          {menu.items.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </div>
    </div>
    
  )
}

export default Navbar