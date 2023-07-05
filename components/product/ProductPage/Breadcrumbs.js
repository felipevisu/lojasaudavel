import Link from 'next/link'

export function Breadcrumbs({product}){
  return(
    <div className="mb-6 breadcrumbs">
      <div className="breadcrumbsItem">
        <Link href="/">
          <a>Página inicial</a>
        </Link>
      </div>
      {product.category.parent &&
        <div className="breadcrumbsItem">
          <Link href={`/categorias/${product.category.parent.slug}`}>
            <a>{product.category.parent.name}</a>
          </Link>
        </div>
      }
      <div className="breadcrumbsItem">
        <Link href={`/categorias/${product.category.slug}`}>
          <a>{product.category.name}</a>
        </Link>
      </div>
    </div>
  )
}

export default Breadcrumbs