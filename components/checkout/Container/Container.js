import { Sumary } from '../Sumary'
import { Progress } from '../Progress'
import { useRouter } from 'next/router'
import { Loading } from '../../common/loading'
import { useAuth } from '../../../framework/auth'
import { useCart } from '../../../framework/cart'

export function CheckoutContainer(props){
  const router = useRouter()
  const auth = useAuth()
  const cart = useCart()

  if(auth.loading || cart.loading){
    return <Loading />
  }

  if(!cart.loading && (cart.cart === null || cart.cart?.lines?.length === 0)){
    router.push('/carrinho')
    return <Loading />
  }
  
  if(!auth.loading && auth.user === null){
    router.push(`/login?next=${router.asPath}`)
    return <Loading />
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
                  Prazo: {cart.cart.shippingMethod.minimumDeliveryDays} {cart.cart.shippingMethod.minimumDeliveryDays > 1 ? "dias úteis" : "dia útil"}
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