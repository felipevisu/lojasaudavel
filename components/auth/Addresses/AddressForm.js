import { Field, Button, Select } from '../../ui'

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
          <Select
            label="Estado"
            id="countryArea"
            name="countryArea"
            value={instance.countryArea}
            onChange={handleChange}
            error={errors.countryArea}
            options={
              [
                {value: "", name: "Selecione um estado"},
                {value: "Acre", name: "Acre"}, 
                {value: "Alagoas", name: "Alagoas"},
                {value: "Amapá", name: "Amapá"},
                {value: "Amazonas", name: "Amazonas"},
                {value: "Bahia", name: "Bahia"},
                {value: "Ceará", name: "Ceará"},
                {value: "Distrito Federal", name: "Distrito Federal"},
                {value: "Espírito Santo", name: "Espírito Santo"},
                {value: "Goiás", name: "Goiás"},
                {value: "Maranhão", name: "Maranhão"},
                {value: "Mato Grosso", name: "Mato Grosso"},
                {value: "Mato Grosso do Sul", name: "Mato Grosso do Sul"},
                {value: "Minas Gerais", name: "Minas Gerais"},
                {value: "Pará", name: "Pará"},
                {value: "Paraíba", name: "Paraíba"},
                {value: "Paraná", name: "Paraná"},
                {value: "Pernambuco", name: "Pernambuco"},
                {value: "Piauí", name: "Piauí"},
                {value: "Rio de Janeiro", name: "Rio de Janeiro"},
                {value: "Rio Grande do Norte", name: "Rio Grande do Norte"},
                {value: "Rio Grande do Sul", name: "Rio Grande do Sul"},
                {value: "Rondônia", name: "Rondônia"},
                {value: "Roraima", name: "Roraima"},
                {value: "Santa Catarina", name: "Santa Catarina"},
                {value: "São Paulo", name: "São Paulo"},
                {value: "Sergipe", name: "Sergipe"},
                {value: "Tocantins", name: "Tocantins"}
              ]
            }
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