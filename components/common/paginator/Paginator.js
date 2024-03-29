import { useMemo } from 'react'

export default function Paginator({pageInfo, paginator}){
  const prevDisabled = useMemo(() => !pageInfo.hasPreviousPage, [pageInfo])
  const nextDisabled = useMemo(() => !pageInfo.hasNextPage, [pageInfo])

  return(
    <div className="text-center py-6">
      <button 
        aria-label="Anterior"
        className={`${prevDisabled ? "bg-gray-200" : "bg-green-500 text-white hover:bg-green-600"} mx-1 px-4 py-1 rounded`}
        onClick={() => paginator("before", pageInfo.startCursor, true)}
        disabled={prevDisabled}
      >Anterior</button>
      <button
        aria-label="Próximo"
        className={`${nextDisabled ? "bg-gray-200" : "bg-green-500 text-white hover:bg-green-600"} mx-1 px-4 py-1 rounded`}
        onClick={() => paginator("after", pageInfo.endCursor, true)}
        disabled={nextDisabled}
      >Próximo</button>
    </div>
  )
}