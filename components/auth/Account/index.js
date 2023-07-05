import { useAuth } from '../../../framework/auth'
import ChangeAccount from './ChangeAccount'
import ChangePassword from './ChangePassword'

export default function Account(props){
  const auth = useAuth()

  return(
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-xl">Minha conta</h3>
        <h4 className="text-2xl">{auth.user.email}</h4>
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