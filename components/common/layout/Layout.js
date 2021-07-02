import dynamic from 'next/dynamic'
import { Footer } from '../footer'
import { Top } from '../top'
import { Navbar } from '../navbar'
import { Header } from '../header'
import { Cart } from '../cart'
import { useAuth } from '../../../framework/auth'
import { Menu } from '../menu'

const Modal = dynamic(() => import('../../auth/Modal'))

export function Layout(props){
  const auth = useAuth()

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