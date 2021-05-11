import { useRouter } from 'next/router'
import { HiOutlineSearch } from "react-icons/hi"
import { useState} from "react"

export function Search(props){
  const [search, setSearch] = useState("")
  const router = useRouter()
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(search){
      router.push('/produtos?search=' + search + "&sort=-rank")
    }
  }

  return(
    <form onSubmit={handleSubmit} className="flex" noValidate>
      <input 
        name="search"
        value={search}
        onChange={handleChange}
        type='text' 
        placeholder="Pesquisar..." 
        className="w-full h-12 border-gray-200 outline-none focus:ring-0 focus:border-green-500" 
      />
      <button type="submit" aria-label="Pesquisar" className="appearance-none focus:outline-none h-12 bg-gray-200 hover:bg-gray-300 text-center px-4">
        <HiOutlineSearch />
      </button>
    </form>
  )
}