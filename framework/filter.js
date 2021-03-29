import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

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
    if(router.query.after){
      setNavigator({
        first: 30,
        after: router.query.after
      })
    } else if(router.query.before){
      setNavigator({
        last: 30,
        before: router.query.before
      })
    }

    var query = {...router.query}
    delete query["slug"]
    delete query["after"]
    delete query["before"]
    
    var attrs = []

    Object.keys(query).forEach(function(key) {
      if(Array.isArray(query[key])){
        attrs.push({
          slug: key,
          values: query[key]
        })
      } else {
        attrs.push({
          slug: key,
          value: query[key]
        })
      }
    });

    if(!arraysEqual(attrs, attributes)){
      setAttributes(attrs)
    }
    
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