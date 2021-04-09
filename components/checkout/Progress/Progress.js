import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiMapPin, FiTruck, FiCreditCard } from  'react-icons/fi'
import { useMemo } from 'react'

export function Progress(){
  const router = useRouter()

  const shipping = useMemo(() => {
    return router.pathname === '/checkout/entrega' || router.pathname === '/checkout/pagamento'
  }, [router.pathname])

  const payment = useMemo(() => {
    return router.pathname === '/checkout/pagamento'
  }, [router.pathname])

  return(
    <div className="grid grid-cols-3 border rounded mb-6 font-semibold">
      <div>
        <Link href="/checkout/endereco">
          <a className="hover:bg-gray-200 block flex items-center justify-center py-2 bg-gray-100 text-green-600">
            <span>
              <FiMapPin />
            </span>
            <span className="pl-2">
              Endereço
            </span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/checkout/entrega">
          <a className={`hover:bg-gray-200 block flex items-center justify-center py-2 border-l ${shipping && 'bg-gray-100 text-green-600'}`}>
            <span>
              <FiTruck />
            </span>
            <span className="pl-2">
              Entrega
            </span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/checkout/pagamento">
          <a className={`hover:bg-gray-200 block flex items-center justify-center py-2 border-l ${payment && 'bg-gray-100 text-green-600'}`}>
            <span>
              <FiCreditCard />
            </span>
            <span className="pl-2">
              Pagamento
            </span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Progress