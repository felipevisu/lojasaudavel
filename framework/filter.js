import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

export function useFilter(initial){
  const router = useRouter()

  const [categories, setCategories] = useState(() => {
    if(initial?.category){
      return [initial.category.id]
    }else{
      return []
    }
  })
  const [attributes, setAttributes] = useState([])
  const [navigator, setNavigator] = useState({ first: 30 })

  useEffect(() => {
    setNavigator(() => {
      if(router.query.after){
        return {
          first: 30,
          after: router.query.after
        }
      } else if(router.query.before){
        return {
          last: 30,
          before: router.query.before
        }
      } else {
        return {
          first: 30
        }
      }
    })

    var query = {...router.query}
    delete query["slug"]
    delete query["after"]
    delete query["before"]
    
    var attributes = []

    Object.keys(query).forEach(function(key) {
      if(Array.isArray(query[key])){
        attributes.push({
          slug: key,
          values: query[key]
        })
      } else {
        attributes.push({
          slug: key,
          value: query[key]
        })
      }
    });

    setAttributes(attributes)
    
  }, [router.query])

  function setFilter(key, value, replace=false){
    const params = new URLSearchParams(window.location.search)
  
    if(params.has('after') || params.has('before')){
      params.delete('after')
      params.delete('before')
    }
  
    if(params.has(key)){
      if(replace){
        params.set(key, value)
      } else {
        let values = params.getAll(key)
        if(values.includes(value)){
          params.delete(key)
          values = values.filter(val => val !== value)
          values.forEach(val => params.append(key, val))
        } else {
          params.append(key, value)
        }
      }
    } else {
      params.set(key, value)
    }
  
    const pathname = window.location.pathname
    router.push(
      {
        pathname: router.pathname,
        query: params.toString()
      },
      pathname + '?' + params.toString(),
      { shallow: true }
    );
    window.scrollTo(0, 0)
  }

  const variables = useMemo(() => ({
    ...navigator,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: categories,
      attributes: attributes
    }
  }), [categories, navigator, attributes])

  return {
    setFilter,
    variables
  }  
}