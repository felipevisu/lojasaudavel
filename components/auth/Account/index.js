import ChangeAccount from './ChangeAccount'
import ChangePassword from './ChangePassword'

export default function Account(props){

  return(
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Minha conta</h3>
      </div>
      <div className="rounded border p-5 mb-6">
        <ChangeAccount />
      </div>
      <div className="rounded border p-5">
        <ChangePassword />
      </div>
    </div>
  )
}