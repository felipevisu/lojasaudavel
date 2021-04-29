import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi"
import { IconButton } from '../../ui'

export function AddressList({addresses, setActive, addressDelete, setUpdate}){
  return(
    <div className={`grid grid-cols-1 ${addresses.length > 0 && 'md:grid-cols-2 xl:grid-cols-3'} gap-4`}>
      <div onClick={() => setActive('create')} className="cursor-pointer hover:bg-gray-50 border rounded p-4 flex items-center justify-center">
          <div>
            <FiPlus className="mx-auto text-3xl" />
            <span className="font-semibold">Adicionar novo</span>
          </div>
      </div>
      {addresses && addresses.map((address, key) =>
        <div key={key} value={address.id} className="appearance-none text-left border rounded p-4">
          {address.streetAddress1}, {address.streetAddress2 && address.streetAddress2}<br/>
          {address.cityArea && `${address.cityArea} - ` }{address.city} / {address.countryArea}<br/>
          Cep: {address.postalCode}
          <hr className=" mt-2"/>
          <div className="mt-3">
            <IconButton icon={<FiEdit />} onClick={() => setUpdate(address.id)} />
            <IconButton icon={<FiTrash2 />} onClick={() => addressDelete(address.id)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressList