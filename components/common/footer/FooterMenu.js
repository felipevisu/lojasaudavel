import Link from 'next/link'
import { queryMenu } from '../../../framework/menu' 
import { useQuery } from '@apollo/client'

export function FooterMenu(){
  const { loading, error, data } = useQuery(queryMenu, {variables: {slug: 'institucional'}})

  return(
    <div className="">
      {data?.menu.items.map((item, key) => 
        <div key={key} className="my-2">
          <Link href={`
            ${item.page ? '/institucional/'+item.page.slug : ''}
            ${item.category ? '/categoria/'+item.category.slug : ''}
            ${item.collection ? '/colecoes/'+item.collection.slug : ''}
          `}>
            <a>{item.name}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterMenu