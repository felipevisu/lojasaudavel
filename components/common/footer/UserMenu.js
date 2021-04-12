import Link from 'next/link'

const MENUS = [
  {link: '/conta', name: 'Minha conta'},
  {link: '/pedidos', name: 'Pedidos'},
  {link: '/enderecos', name: 'Endereços'}
]

export function UserMenu(){
  return(
    <div className="">
      {MENUS.map((item, key) =>
        <div key={key} className="my-2">
          <Link href={item.link}>
            <a>{item.name}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserMenu