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

function useTopMenu(){
  const [menu, setMenu] = useState(null)
  
  const apolloClient = initializeApollo();

  useEffect(() => {
    async function fetchMenu(){
      const response = await apolloClient.query(
        { 
          query: queryMenu, 
          variables: {slug: "navbar"}
        }
      );
      setMenu(response.data.menu)
    }
    fetchMenu();
  }, [])

  return {
    menu
  }
} 

export default useTopMenu