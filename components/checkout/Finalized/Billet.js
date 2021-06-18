var Barcode = require('react-barcode');

export function Billet({ billet }){
  return (
    <div className="text-center bg-gray-100 border border-gray-200 rounded p-4 mb-4">
      <div className="mb-2 flex justify-center">
        <Barcode width={2} background="#F3F4F6" value={billet.barcode} />
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