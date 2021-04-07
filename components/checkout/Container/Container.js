import { useCommerce } from '../../../framework'
import { Sumary } from '../Sumary'

export function CheckoutContainer(props){
  const { auth, cart } = useCommerce()

  if(auth.authLoading || cart.cartLoading){
    return <div className="container mx-auto px-4 py-4 mt-6">Carregando...</div>
  }

  return(
    <div className="container mx-auto px-4 py-4 mt-6">
      <div className="grid grid-cols-6 gap-12 ">
        <div className="col-span-4">
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