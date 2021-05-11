import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCommerce } from '../../../framework'
import { useFilter } from "../../../framework/filter"
import { IoMdClose } from 'react-icons/io'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import styled from './Filter.module.css'

function Value({attribute, name, slug}){
  const router = useRouter()
  const { setFilter } = useFilter()
  const [checked, setChecked] = useState(false)

  const change = (e) => {
    setChecked(!checked)
    setFilter(attribute, slug)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if(params.has(attribute)){
      let values = params.getAll(attribute)
      if(values.includes(slug)){
        setChecked(true)
      }
    }
  }, [router.query])
  
  return (
    <div>
      <label className="inline-flex items-center">
        <input checked={checked} type="checkbox" name={attribute} value={slug} onChange={change} className="h-4 w-4 rounded text-green-400 border-gray-400"/>
        <span className="ml-2 text-gray-700">{name}</span>
      </label>
    </div>
  )
}

function Attribute(props){
  return(
    <div className="py-3">
      <h4 className="font-semibold mb-2">{props.name}</h4>
      <PerfectScrollbar style={{maxHeight: 300}} className="border p-4">
        {props.values.map((value) =>
          <Value key={value.id} attribute={props.slug} name={value.name} slug={value.slug} />
        )}
      </PerfectScrollbar>
      
    </div>
  )
}

export function Filter({attributes}){
  const { filterOpen, setFilterOpen } = useCommerce()

  return(
    <>
      <div onClick={() => setFilterOpen(false)} className={` ${filterOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black z-40 opacity-50 `} />
      <div className={`${styled.sideBar} ${filterOpen && styled.open }`}>
        <div className="flex items-center bg-gray-200 pl-6 pr-4 h-12">
          <span className="font-semibold">Filtro</span>
          <button aria-label="Fechar" onClick={() => setFilterOpen(false)} className="focus:outline-none ml-auto mr-0"><IoMdClose /></button>
        </div>
        <div className="px-6 py-3 absolute bottom-0 top-12 overflow-auto w-full">
          {attributes.map((attribute) => 
            <Attribute {...attribute} key={attribute.id} />
          )} 
        </div>
      </div>
    </>
  )
}

export default Filter