import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Banner({ banner }){
  const path = useMemo(() => {
    if(banner.category){
      return '/categorias/' + banner.category.slug
    }
    if(banner.collection){
      return '/colecoes/' + banner.collection.slug
    }
    if(banner.page){
      return '/institucional/' + banner.page.slug
    }
    return '#'
  }, [banner])

  return(
    <Link href={path}>
      <a aria-label={path}>
        <Image src={banner.image} alt={path} width={640} height={320} className="rounded-md" />
      </a>
    </Link>
  )
}

export default Banner