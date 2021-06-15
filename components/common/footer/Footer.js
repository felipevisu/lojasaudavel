import UserMenu from './UserMenu'
import FooterMenu from './FooterMenu'
import Contact from './Contact'
import Copyright from './Copyright'


export function Footer(props){
  return(
    <div className="bg-gray-100 border-t">
      <div className="container mx-auto py-10 xl:py-14 px-4">
        <div className="grid grid-cols-10 gap-4 xl:gap-6">
          <div className="col-span-5 md:col-span-3 xl:col-span-2">
            <h5 className="font-bold mb-4">Menu do usuário</h5>
            <UserMenu />
          </div>
          <div className="col-span-5 md:col-span-3 xl:col-span-2">
            <h5 className="font-bold  mb-4">Informações</h5>
            <FooterMenu />
          </div>
          <div className="col-span-10 md:col-span-4 xl:col-span-3">
            <h5 className="font-bold">Contato</h5>
            <Contact />
          </div>
          <div className="col-span-10 xl:col-span-3">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer