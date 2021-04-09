import { useCommerce } from '../../../framework'
import { Sumary } from '../Sumary'
import { Empty } from '../Empty'
import { Progress } from '../Progress'
import { Auth } from "../../auth/modal/Auth"


export function CheckoutContainer(props){
  const { auth, cart } = useCommerce()

  console.log(auth.authLoading, cart.cartLoading)

  if(auth.authLoading || cart.cartLoading){
    return <div className="container mx-auto px-4 py-10">Carregando...</div>
  } 
  
  if(!auth.user){
    return (
      <div className="w-96 mx-auto p-6 border rounded my-10">
        <Auth />
      </div>
    )
  }

  if(!cart.cart || cart.cart?.lines?.length === 0){
    return <Empty />
  }
  
  return(
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-6 gap-12 ">
        <div className="col-span-4">
          <Progress />
          {props.children}
        </div>
        <div className="col-span-2">
          <Sumary />
        </div>
      </div>
    </div>
  )
}

export default CheckoutContainer