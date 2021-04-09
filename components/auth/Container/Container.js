import { useCommerce } from '../../../framework'
import Menu from '../Menu'

export function Container(props){
    
  return(
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-8 gap-12 ">
        <div className="col-span-2">
          <Menu />
        </div>
        <div className="col-span-6">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Container