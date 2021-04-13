import { useCommerce } from '../../../framework'
import { Sumary } from '../Sumary'
import { Progress } from '../Progress'
import { Auth } from "../../auth/Modal/Auth"
import { Empty } from '../Empty'
import { useMemo } from 'react'
import { formatMoney } from '../../utils'

export function CheckoutContainer(props){
  const { auth, cart } = useCommerce()

  if(auth.authLoading || cart.cartLoading){
    return <div className="container mx-auto px-4 py-10">Carregando...</div>
  }
  
  if(!auth.authLoading && auth.user === null){
    return (
      <div className="w-96 mx-auto p-6 border rounded my-10">
        <Auth />
      </div>
    )
  }

  if(!cart.cartLoading && (cart.cart === null || cart.cart?.lines?.length === 0)){
    return <Empty />
  }
  
  return(
    <div className="container mx-auto px-4 py-4 lg:py-10">
      <div className="grid grid-cols-6 gap-6 xl:gap-12">
        <div className="col-span-6 xl:col-span-4">
          <Progress />
          {props.children}
          {
            (cart.cart.shippingAddress || cart.cart.shippingMethod) &&
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t mt-4 pt-8">
              {
                cart.cart.shippingAddress && 
                <div>
                  <h5 className="font-semibold">Endereço selecionado</h5>
                  {cart.cart.shippingAddress.streetAddress1}, {cart.cart.shippingAddress.streetAddress2 && cart.cart.shippingAddress.streetAddress2}<br/>
                  {cart.cart.shippingAddress.cityArea && `${cart.cart.shippingAddress.cityArea} - ` }{cart.cart.shippingAddress.city} / {cart.cart.shippingAddress.countryArea}<br/>
                  Cep: {cart.cart.shippingAddress.postalCode}
                </div>
              }
              {
                cart.cart.shippingMethod &&
                <div>
                  <h5 className="font-semibold col-span-2">Entrega selecionada</h5>
                  Serviço: {cart.cart.shippingMethod.name}<br/>
                  Preço: {formatMoney(cart.cart.shippingMethod.price.amount)}
                </div> 
              }
            </div>
          }
        </div>
        <div className="col-span-6 xl:col-span-2">
          {cart.cart && <Sumary />}
        </div>
      </div>
    </div>
  )
}

export default CheckoutContainer