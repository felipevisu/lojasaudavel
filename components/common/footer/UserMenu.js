import Link from 'next/link'

const MENU = [
  {link: "/atendimento", name: "Atendimento"},
  {link: "/cancelamento", name: "Cancelamento"},
  {link: "/enderecos", name: "Endereços"},
  {link: "/pedidos", name: "Meus pedidos"},
  {link: "/conta", name: "Minha conta"}
]

export function UserMenu(){
  return(
    <div className="">
      {MENU.map((item, key) =>
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