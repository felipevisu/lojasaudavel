import { Footer } from '../footer'

export function Layout(props){

  return(
    <>
      {props.children}
      <Footer />
    </>
  )
}

export default Layout