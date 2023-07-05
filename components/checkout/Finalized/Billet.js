import { useRef, useState } from 'react'

export function Billet({ billet }){
  const barcode = useRef()
  const [copied, setCopied] = useState(false)

  const copyCodeToClipboard = () => {
    const el = barcode.current
    el.select()
    document.execCommand("copy")
    setCopied(true)
  }

  return (
    <div className="text-center bg-gray-100 border border-gray-200 rounded p-4 mb-4">

      <div className="flex mb-4">
        <div className="w-full">
          <input 
            className="appearance-none bg-gray-300 border-0 rounded-l-md text-center w-full h-8 font-bold"
            ref={barcode} 
            value={billet.barcode} 
            type="text" 
            readonly 
          />
        </div>
        <div className="flex-1">
          <button 
            className="h-8 bg-gray-500 text-white px-4 rounded-r-md"
            type="button" 
            onClick={() => copyCodeToClipboard()}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <a href={billet.url} target="_blank">
        <button className="
          bg-red-500 
          hover:bg-red-600
          appearance-none
          focus:outline-none
          rounded
          font-semibold
          px-6
          py-2
          mb-2
          text-white
        ">Download do boleto</button>
      </a>
    </div>
  )
}

export default Billet