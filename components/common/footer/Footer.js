export function Footer(props){
  return(
    <div className="bg-gray-100 border-t mt-6">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-10 gap-4 xl:gap-6">
          <div className="col-span-2">
            <h5 className="font-bold">Menu do usuário</h5>
          </div>
          <div className="col-span-2">
            <h5 className="font-bold">Informações</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-bold">Contato</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer