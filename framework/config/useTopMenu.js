import { gql } from "@apollo/client";
import { initializeApollo } from '../../lib/apolloClient'
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
  const apolloClient = initializeApollo();
  
  const response = await apolloClient.query(
    { 
      query: queryMenu, 
      variables: {slug: slug}
    }
  );
  return response
}

function useTopMenu(){
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    async function fetchMenu(slug){
      const response = await getMenu(slug)
      return response
    }
    fetchMenu("navbar");
  }, [])

  return {
    menu
  }
} 

export default useTopMenu