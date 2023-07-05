import Link from 'next/link'
import { Button } from '../../ui'

export function ErrorPage(props){
  return (
    <div className="w-full">
      <div className="py-14 lg:p-20 text-center">
        <h3 className="text-xl text-2xl text-9xl">404</h3>
        <h4 className="text-2xl">Oooops!</h4>
        <div className="text-xl font-bold my-4">A página que você está producurando não existe!</div>
        <div className="block">
          <Link href="/">
            <Button  size="lg" value="Retorne a  página inicial" />
          </Link>  
        </div>
      </div>
    </div>
  )
}

export default ErrorPage