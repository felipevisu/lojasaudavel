export function Button({onClick, value, full=false, outline=false, type="button", size="md", className=""}){
  return(
    <button
      aria-label={value} 
      type={type}
      onClick={onClick}
      className={`
        appearance-none
        focus:outline-none
        rounded
        font-semibold
        border
        ${outline
          ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
          : 'border-green-500 text-white bg-green-500 hover:bg-green-600 hover:border-green-600'
        }
        ${size === 'sm' && "px-3 py-1 text-sm"}
        ${size === 'md' && "px-6 py-2"}
        ${size === 'lg' && "px-8 py-3"}
        ${full && "w-full"}
        ${className
          ? className
          : ''
        }
      `}
    >
      {value}
    </button>
  )
}

export default Button