export function Field({id, label, name, value, error, onChange, type="text", placeholder=""}){
  return(
    <div>
      <label className="block text-gray-500 text-sm font-semibold mb-1" htmlFor={id}>
        {label}
      </label>
      <input 
        className={`appearance-none w-full rounded border-gray-300 ${error && 'border-red-300'} focus:ring-0 focus:border-green-500`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="font-semibold text-red-500 text-xs">{error}</span>}
    </div>
  )
}

export default Field