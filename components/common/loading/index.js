import { VscLoading } from 'react-icons/vsc'

export function Loading(){
  return(
    <div className="rounded p-4 my-6 text-center">
      <VscLoading className="mx-auto text-4xl animate-spin text-green-500" />
      <div className="mt-2 text-xl">
        Carregando... 
      </div>
    </div>
  )
}