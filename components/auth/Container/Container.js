import { useCommerce } from '../../../framework'
import Menu from '../Menu'
import { Auth } from "../Modal/Auth"

export function Container(props){
  const { auth } = useCommerce()

  if(auth.authLoading){
    return <div className="container mx-auto px-4 py-10">Carregando...</div>
  }

  if(!auth.authLoading && auth.user === null){
    return (
      <div className="w-96 mx-auto p-6 border rounded my-10">
        <Auth />
      </div>
    )
  }
    
  return(
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-8 gap-12 ">
        <div className="col-span-2">
          <Menu />
        </div>
        <div className="col-span-6">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Container