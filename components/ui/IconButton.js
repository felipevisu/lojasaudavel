export function IconButton({onClick, icon, type="button"}){
  return(
    <button
      type={type}
      onClick={onClick}
      className={`
        appearance-none
        focus:outline-none
        p-2
        border
        mr-2
        rounded
        hover:bg-gray-200
      `}
    >
      {icon}
    </button>
  )
}

export default IconButton