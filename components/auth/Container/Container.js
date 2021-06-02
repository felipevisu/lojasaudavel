import { useCommerce } from '../../../framework'
import Menu from '../Menu'
import { Auth } from "../Modal/Auth"
import { Loading } from '../../common/loading'

export function Container(props){
  const { auth } = useCommerce()

  if(auth.authLoading){
    return <Loading />
  }

  if(!auth.authLoading && auth.user === null){
    return (
      <div className="w-96 mx-auto p-6 border rounded my-10">
        <Auth />
      </div>
    )
  }
    
  if(!auth.authLoading && auth.user !== null){
    return(
      <div className="container mx-auto px-4 py-4 lg:py-10">
        <div className="grid grid-cols-8 gap-6 xl:gap-12">
          <div className="col-span-8 lg:col-span-2">
            <Menu />
          </div>
          <div className="col-span-8 lg:col-span-6">
            {props.children}
          </div>
        </div>
      </div>
    )
  }

  return null
  
}

export default Container