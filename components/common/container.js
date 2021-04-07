import { Navbar } from './navbar'
import { Header } from './header'
import { Cart } from './cart'

export function Container(props){
  return(
    <>
      <Header />
      <Navbar />
      <Cart />
      {props.children}
    </>
  )
}

export default Container