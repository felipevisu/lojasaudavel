import { Footer } from '../footer'
import { Navbar } from '../navbar'

export function Layout(props){

  return(
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout