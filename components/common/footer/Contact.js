import { FiPhoneCall, FiMapPin, FiClock } from 'react-icons/fi'

export function Contact(props){
  return(
    <div>
      <div className="flex items-center mt-3">
        <div className="w-10 text-2xl text-green-500">
          <FiPhoneCall />
        </div>
        <div>
          <span className="text-lg">(35) 98822-0101</span><br/>
          <span>contato@lojasaudavel.com.br</span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div className="w-10 text-2xl text-green-500">
          <FiMapPin />
        </div>
        <div>
          <span>R. Pereira do Nascimento, 237 - Centro<br/>Guaxupé - MG, 37800-000</span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div className="w-10 text-2xl text-green-500">
          <FiClock />
        </div>
        <div>
          <span>Horário de funcionamento:<br/>Seg - Sex, das 09:00 as 18:00 hrs</span>
        </div>
      </div>
    </div>
  )
}

export default Contact