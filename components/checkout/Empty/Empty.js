import Link from 'next/link'

export function Empty(props){
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center w-96 mx-auto">
        <h3 className="border-b pb-6 mb-8">
          <span className="text-4xl">Seu carrinho</span><br/>
          <span className="text-5xl font-bold">Está vazio =(</span>
        </h3>
        <Link href="/">
          <a className="inline-block bg-green-500 px-8 py-3 rounded hover:bg-green-600 text-white font-semibold text-xl">Continue comprando</a>
        </Link>
      </div>
      
    </div>
  )
}

export default Empty