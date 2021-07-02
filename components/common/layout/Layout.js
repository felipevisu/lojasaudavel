import dynamic from 'next/dynamic'
import { Footer } from '../footer'
import { Top } from '../top'
import { Navbar } from '../navbar'
import { Header } from '../header'
import { Cart } from '../cart'
import { useAuth } from '../../../framework/auth'
import { Menu } from '../menu'
import { useCart } from '../../../framework/cart'
import { useEffect } from 'react'

const Modal = dynamic(() => import('../../auth/Modal'))

export function Layout(props){
  const auth = useAuth()
  const cart = useCart()

  useEffect(() => {
    auth.initialize()
    cart.initialize()
  }, [])

  return(
    <>
      <Top />
      <Header />
      <Navbar />
      <Cart />
      <Menu />
      {auth.open && <Modal />}
      {props.children}
      <Footer />
    </>
  )
}

export default Layout