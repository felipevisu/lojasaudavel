import { useState } from "react"

export function ProductDetails({product}){
  const [active, setActive] = useState(() => {
    if(product.description) return 'description'
    if(product.extraInfos) return 'extraInfos'
    return 'brand'
  })

  if(!product.description && product.extraInfos && product.brand?.description){
    return null
  }

  return (
    <div>
      <div className="tabMenu">
        {product.description && 
          <div className={`tabItem ${active === 'description' && 'active'}`} onClick={() => setActive('description')}>
            Descrição
          </div>
        }
        {product.extraInfos &&
          <div className={`tabItem ${active === 'extraInfos' && 'active'}`} onClick={() => setActive('extraInfos')}>
            Informações Nutricionais
          </div>
        }
        {product.brand?.description && 
          <div className={`tabItem ${active === 'brand' && 'active'}`} onClick={() => setActive('brand')}>
            Sobre a marca
          </div>
        }
      </div>
      <div className="tabContent">
        {active === 'description' &&
          <div className="tab overflow-auto">
            <div className="htmlContent" dangerouslySetInnerHTML={{__html: product.description}} />
          </div>
        }
        {active === 'extraInfos' &&
          <div className="tab overflow-auto">
            <div className="htmlContent" dangerouslySetInnerHTML={{__html: product.extraInfos}} />
          </div>
        }
        {active === 'brand' &&
          <div className="tab overflow-auto">
            <div className="htmlContent" dangerouslySetInnerHTML={{__html: product.brand?.description}} />
          </div>
        }
      </div>  
    </div>
    
  )
}

export default ProductDetails