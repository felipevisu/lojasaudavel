import { Footer } from '../footer'
import { Top } from '../top'
import dynamic from 'next/dynamic'
import { useCommerce } from '../../../framework'

const Modal = dynamic(() => import('../../auth/modal'))

export function Layout(props){
  const { auth } = useCommerce()

  return(
    <>
      <Top />
      {auth.open && <Modal />}
      {props.children}
      <Footer />
    </>
  )
}

export default Layout