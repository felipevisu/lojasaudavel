import Head from 'next/head'

export function Cart(props){

  return(
    <>
      <Head>
        <title>Loja Saudável - Carrinho de compras</title>
      </Head>
      <div className="w-96 mx-auto p-6 border rounded my-10">
        Carrinho de compras
      </div>
    </>
  )
}

export default Cart