import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

const SORT_DICT = {
  "price": {field: "PRICE", direction: "ASC"},
  "-price": {field: "PRICE", direction: "DESC"},
  "name": {field: "NAME", direction: "ASC"},
  "-name": {field: "NAME", direction: "DESC"},
  "date": {field: "DATE", direction: "ASC"},
  "-date": {field: "DATE", direction: "DESC"}
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function useFilter(initial=null){
  const router = useRouter()

  const [categories, setCategories] = useState(() => {
    if(initial && initial.category){
      return [initial.category.id]
    }else{
      return []
    }
  })
  const [sort, setSort] = useState({
    field: "DATE",
    direction: "DESC"
  })
  const [search, setSearch] = useState("")
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

    if(router.query.sort){
      const new_sort = SORT_DICT[router.query.sort]
      if(new_sort !== sort){
        setSort(new_sort)
      }
    }

    if(router.query.search && router.query.search !== search){
      setSearch(router.query.search)
    }

    if(router.query.slug && !arraysEqual([initial?.category?.id], categories)){
      setCategories([initial?.category?.id])
      setNavigator({ first: 30 })
    }

    var query = {...router.query}
    delete query["slug"]
    delete query["after"]
    delete query["before"]
    delete query["sort"]
    delete query["search"]
    
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
      ...sort,
      channel: "casa-nature"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: categories,
      attributes: attributes,
      search: search,
    }
  }), [categories, navigator, attributes, sort, search])

  return {
    setFilter,
    variables
  }  
}