import { Footer } from '../footer'
import { Top } from '../top'
import { Navbar } from '../navbar'
import { Header } from '../header'
import { Cart } from '../cart'
import dynamic from 'next/dynamic'
import { useCommerce } from '../../../framework'

const Modal = dynamic(() => import('../../auth/modal'))

export function Layout(props){
  const { auth } = useCommerce()

  return(
    <>
      <Top />
      <Header />
      <Navbar />
      <Cart />
      {auth.open && <Modal />}
      {props.children}
      <Footer />
    </>
  )
}

export default Layout