export function Button({onClick, value, full=false, type="button", size="md"}){
  return(
    <button
      type={type}
      onClick={onClick}
      className={`
        appearance-none
        focus:outline-none
        bg-green-500
        hover:bg-green-600
        rounded
        ${size === 'sm' && "px-4 py-1"}
        ${size === 'md' && "px-6 py-2"}
        ${size === 'lg' && "px-8 py-3"}
        ${full && "w-full"}
        text-white
        font-semibold
      `}
    >
      {value}
    </button>
  )
}

export default Button