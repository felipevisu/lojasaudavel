import { Footer } from '../footer'
import { Navbar } from '../navbar'
import { Header } from '../header'
import { Top } from '../top'

export function Layout(props){

  return(
    <>
      <Top />
      <Header />
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout