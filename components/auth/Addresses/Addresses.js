import { useCommerce } from "../../../framework"
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi"
import { IconButton } from '../../ui'

export function Addresses(){
  const { auth } = useCommerce()

  return(
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Endereços</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="cursor-pointer hover:bg-gray-50 border rounded p-4 flex items-center justify-center">
            <div>
              <FiPlus className="mx-auto text-3xl" />
              <span className="font-semibold">Adicionar novo</span>
            </div>
        </div>
        {auth.user.addresses.map((address, key) =>
          <div key={key} className="border rounded p-4">
            {address.streetAddress1}, {address.streetAddress2 && address.streetAddress2}<br/>
            {address.cityArea && `${address.cityArea} - ` }{address.city} / {address.countryArea}<br/>
            Cep: {address.postalCode}
            <hr className=" mt-2"/>
            <div className="mt-3">
              <IconButton icon={<FiEdit />} />
              <IconButton icon={<FiTrash2 />} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Addresses