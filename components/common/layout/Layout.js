import { Footer } from '../footer'
import { Navbar } from '../navbar'
import { Header } from '../header'
import { Top } from '../top'
import { Modal } from '../../auth/modal'

export function Layout(props){

  return(
    <>
      <Top />
      <Header />
      <Navbar />
      <Modal />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout