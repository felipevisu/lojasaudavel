import Image from 'next/image'

export function Copyright(){
  return(
    <div>
      <Image width="250px" height="80px" src="/logo.svg" alt="Loja Saudável" />
      <p className="mb-4">
        © Loja Saudável. CNPJ: 38.232.280/0001-36.<br/>
        Desenvolvido por <span className="font-semibold">Visualize Comunicação</span>.
      </p>
      <Image src="/cards.png" alt="bandeiras" width="350px" height="30" />
    </div>
  )
}

export default Copyright