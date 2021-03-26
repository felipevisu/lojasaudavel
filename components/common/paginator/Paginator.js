import { useMemo } from 'react'

export default function Paginator({pageInfo, onNav}){
  const prevDisabled = useMemo(() => !pageInfo.hasPreviousPage, [pageInfo])
  const nextDisabled = useMemo(() => !pageInfo.hasNextPage, [pageInfo])

  return(
    <div className="text-center pt-6">
      <button 
        className={`${prevDisabled ? "bg-gray-200" : "bg-green-500 text-white hover:bg-green-600"} mx-1 px-4 py-1 rounded`}
        onClick={() => onNav(pageInfo.startCursor, "prev")}
        disabled={prevDisabled}
      >Anterior</button>
      <button
        className={`${nextDisabled ? "bg-gray-200" : "bg-green-500 text-white hover:bg-green-600"} mx-1 px-4 py-1 rounded`}
        onClick={() => onNav(pageInfo.endCursor, "next")}
        disabled={nextDisabled}
      >Próximo</button>
    </div>
  )
}