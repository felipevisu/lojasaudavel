import Link from 'next/link'

export function Container(props){
    
  return(
    <div className="p-5 rounded border bg-gray-100">
      <h5 className="font-bold border-b pb-2 mb-4 text-lg">Menu</h5>
      <div className="my-1 text-lg">
        <Link href="/conta">
          <a>Minha conta</a>
        </Link>
      </div>

      <div className="my-1 text-lg">
        <Link href="/pedidos">
          <a>Pedidos</a>
        </Link>
      </div>

      <div className="my-1 text-lg">
        <Link href="/enderecos">
          <a>Endereços</a>
        </Link>
      </div>
    </div>
  )
}

export default Container