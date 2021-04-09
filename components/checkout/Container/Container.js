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

  const address = useMemo(() => cart.cart?.shippingAddress, [cart.cart?.shippingAddress])
  const method = useMemo(() => cart.cart?.shippingMethod, [cart.cart?.shippingMethod])
  
  return(
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-6 gap-12">
        <div className="col-span-4">
          <Progress />
          {props.children}
          {
            address && method &&
            <div className="grid grid-cols-2 border-t mt-4 pt-8">
              {
                address && 
                <div>
                  <h5 className="font-semibold">Endereço selecionado</h5>
                  {address.streetAddress1}, {address.streetAddress2 && address.streetAddress2}<br/>
                  {address.cityArea && `${address.cityArea} - ` }{address.city} / {address.countryArea}<br/>
                  Cep: {address.postalCode}
                </div>
              }
              {
                method &&
                <div>
                  <h5 className="font-semibold">Entrega selecionada</h5>
                  Serviço: {method.name}<br/>
                  Preço: {formatMoney(method.price.amount)}
                </div> 
              }
            </div>
          }
        </div>
        <div className="col-span-2">
          {cart.cart && <Sumary />}
        </div>
      </div>
    </div>
  )
}

export default CheckoutContainer