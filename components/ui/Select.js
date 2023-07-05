export function Select({id, label, name, value, options, error, onChange, className=""}){
  return(
    <div>
      <label className="block text-gray-500 text-sm font-semibold mb-1" htmlFor={id}>
        {label}
      </label>
      <select 
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`appearance-none w-full rounded border-gray-300 ${error && 'border-red-300'} focus:ring-0 focus:border-green-500 ${className}`}
      >
        {options.map((option, key) =>
          <option key={key} value={option.value}>{option.name}</option>
        )}
      </select>
      {error && <span className="font-semibold text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default Select