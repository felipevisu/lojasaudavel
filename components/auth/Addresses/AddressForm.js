import { Field, Button } from '../../ui'

export function AddressForm({loading, instance, errors, handleChange, handleSubmit}){

  return(
    <form onSubmit={handleSubmit} noValidate>
      
      <div className="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
        <div className="col-span-3">
          <Field 
            label="Endereço"
            id="streetAddress1"
            name="streetAddress1" 
            type="text" 
            onChange={handleChange}
            value={instance.streetAddress1}
            error={errors.streetAddress1}
          />
        </div>
        <div className="col-span-1">
          <Field 
            label="Número"
            id="streetAddress2"
            name="streetAddress2" 
            type="text" 
            onChange={handleChange}
            value={instance.streetAddress2}
            error={errors.streetAddress2}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Bairro"
            id="cityArea"
            name="cityArea" 
            type="text" 
            onChange={handleChange}
            value={instance.cityArea}
            error={errors.cityArea}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Cidade"
            id="city"
            name="city" 
            type="text" 
            onChange={handleChange}
            value={instance.city}
            error={errors.city}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="Estado"
            id="countryArea"
            name="countryArea" 
            type="text" 
            onChange={handleChange}
            value={instance.countryArea}
            error={errors.countryArea}
          />
        </div>
        <div className="col-span-2">
          <Field 
            label="CEP"
            id="postalCode"
            name="postalCode" 
            type="text" 
            onChange={handleChange}
            value={instance.postalCode}
            error={errors.postalCode}
          />
        </div>
      </div>
      <Button type="submit" value={loading ? 'Carregando...' : 'Enviar'} />
    </form>
  )
}

export default AddressForm