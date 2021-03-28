import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFilter } from "../../../framework/filter"
import { Scrollbars } from 'react-custom-scrollbars';

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
    <div className="mb-6">
      <h4 className="font-semibold mb-2">{props.name}</h4>
      <Scrollbars autoHeight autoHeightMax={200} className="border rounded">
        <div className="p-4">
          {props.values.map((value) =>
            <Value key={value.id} attribute={props.slug} name={value.name} slug={value.slug} />
          )}
        </div>
      </Scrollbars>
    </div>
  )
}

export function Filter({attributes}){
  return(
    <div className="">
      {attributes.map((attribute) => 
        <Attribute {...attribute} key={attribute.id} />
      )}
    </div>
  )
}

export default Filter