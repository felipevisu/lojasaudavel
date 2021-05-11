import { useRef, useState, useEffect } from 'react'
import { HiOutlineAdjustments, HiSortAscending } from 'react-icons/hi'
import { useCommerce } from '../../../framework';
import { useFilter } from '../../../framework/filter';

const SORT_FIELDS = [
  {value: "price", name: "Preço: menor / maior"},
  {value: "-price", name: "Preço: maior / menor"},
  {value: "name", name: "Título (crescente)"},
  {value: "-name", name: "Título (decrescente)"},
  {value: "date", name: "Última atualização (crescente)"},
  {value: "-date", name: "Última atualização (decrescente)"}
]

export function Header({category, total}){
  const sorter = useRef()
  const filter = useFilter()
  const { filterOpen, setFilterOpen } = useCommerce()
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (!sorter.current.contains(e.target)) {
      setDropdown(false)
    }
  };
  
  const handleChange = (e) => {
    filter.setFilter("sort", e.target.value, true)
    setDropdown(false)
  }

  return(
    <div className="relative flex w-full items-center border my-6">
      <div>
        <button aria-label="Filtro" onClick={() => setFilterOpen(true)} className="focus:outline-none px-4 py-2 flex items-center border-r hover:bg-gray-200">
          <HiOutlineAdjustments className="mr-1" />
          <span>Filtro</span>
        </button>
      </div>
      
      <div className="px-4">
        {category ? category.name : "Produtos"} ({total})
      </div>

      <div ref={sorter} className="ml-auto mr-0">

        <button aria-label="Ordenação" onClick={() => setDropdown(!dropdown)} className="focus:outline-none px-4 py-2 flex items-center border-l hover:bg-gray-200">
          <HiSortAscending className="mr-1" />
          <span>Ordenação</span>
        </button>

        <div className={` ${ dropdown ? "block" : "hidden"}`}>
          <div className="absolute z-40 w-72 right-0 bg-white border p-4" style={{marginRight: -1}}>
            {SORT_FIELDS.map((field, key) =>
              <button aria-label={field.name} key={key} onClick={handleChange} value={field.value} className="focus:outline-none w-full text-left py-1">{field.name}</button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Header