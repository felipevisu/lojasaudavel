import Head from 'next/head'

export function OfflinePage(){
  return (
    <>
      <Head>
        <title>Loja Saudável - Você está offline!</title>
      </Head>
      <div className="w-full">
        <div className="py-14 lg:p-20 text-center">
          <h4 className="text-2xl">Você está offline!</h4>
          <div className="text-xl font-bold my-4">Conecte-se a internet para acessar nossa loja!</div>
        </div>
      </div>
    </>
  )
}

export default OfflinePage