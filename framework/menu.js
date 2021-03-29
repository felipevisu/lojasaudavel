import { gql } from "graphql-request";
import { graphqlClient } from '../lib/graphqlClient'
import { useState, useEffect } from "react"

const MenuItemFragment = gql`
  fragment MenuItemFragment on MenuItem{
    id
    name
    category{
      slug
    }
    collection{
      slug
    }
    page{
      slug
    }
  }
`

export const queryMenu = gql`
  ${MenuItemFragment}
  query Menu(
    $slug: String
  ){
    menu(slug: $slug){
      id
      name
      items {
        ...MenuItemFragment
        children{
          ...MenuItemFragment
          children{
            ...MenuItemFragment
          }
        }
      }
    }
  }
`;

export async function getMenu(slug){  
  const response = await graphqlClient.request(queryMenu, {slug: slug});
  return response
}

export function useTopMenu(){
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    async function fetchMenu(slug){
      const response = await getMenu(slug)
      setMenu(response)
    }
    fetchMenu("navbar");
  }, [])

  return menu?.menu
} 

export default useTopMenu