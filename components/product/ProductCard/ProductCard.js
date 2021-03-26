import { useState, useMemo } from "react"
import { formatMoney } from '../../utils'
import { FiShoppingCart, FiEye } from 'react-icons/fi'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'

function ProductOptions({selected, onChange, variants}) {

  return (
    <div className="flex items-center justify-center mb-3">
      <div className="w-full max-w-xs mx-auto z-30">
        <Listbox
          as="div"
          className="space-y-1"
          value={selected.id}
          onChange={onChange}
        >
          {({ open }) => (
            <>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button className="cursor-default relative w-full rounded-md border bg-gray-50 bg-white pl-3 pr-10 h-8 text-left focus:outline-none focus:shadow-outline-green focus:border-green-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {variants.map((variant) => (
                      <Listbox.Option key={variant.id} value={variant.id} disabled={variant.quantityAvailable <= 0}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "text-white bg-green-600"
                                : "text-gray-900"
                            } ${variant.quantityAvailable <= 0 && "line-through"} cursor-default select-none relative py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {variant.name}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-green-600"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}

export function ProductCard(props){
  const [selected, setSelected] = useState(props.variants.filter(variant => variant.quantityAvailable > 0)[0])

  const handleChange = (value) => {
    setSelected(props.variants.find(variant => variant.id == value))
  }

  const currentImage = useMemo(() => props.images.find(image => image.id === selected.images[0]?.id) || props.images[0], [selected])

  return(
    <div className="mb-2">

      <div className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-md mb-2">
        {props.images.map(image => 
          <div className={`absolute w-full transition-all duration-300 transform hover:scale-110 ${image.id === currentImage.id ? 'opacity-100' : 'opacity-0'}`}>
            <Image 
              key={image.id}
              src={image.url} 
              alt={props.name}
              width={300}
              height={300}
            />
          </div>
        )}
      </div>
      
      
      <h6 className="font-semibold text-gray-500">{props.category.name}</h6>
      <h5 className="font-semibold text-md text-black mb-2">{props.name}</h5>
      <h4 className="font-bold text-green-600 mb-2">
        {formatMoney(selected.pricing.price.gross.amount)}
      </h4>
      
      {props.productType.hasVariants &&
        <ProductOptions 
          variants={props.variants}
          onChange={handleChange}
          selected={selected}
        />
      }

      <div className="flex flex-wrap">
        <button className="mr-1 flex items-center transition-all font-semibold bg-gray-200 text-sm px-3 h-8 rounded-md text-gray-700 hover:bg-gray-300">
          <FiShoppingCart className="mr-2" /> Comprar
        </button>
        <button className="flex border items-center transition-all font-semibold bg-gray-100 text-sm px-3 h-8 rounded-md text-gray-700 hover:bg-gray-200">
          <FiEye className="md:mr-2" /> <span className="hidden md:block">Detalhes</span>
        </button> 
      </div>
      
    </div>
  )
}

export default ProductCard