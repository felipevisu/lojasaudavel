import { initializeApollo } from "../../lib/apolloClient"
import { gql } from '@apollo/client'
import edjsHTML from 'editorjs-html'
import Head from 'next/head'
import { FooterMenu } from '../../components/common/footer/FooterMenu'

export function Page({page}){
  const edjsParser = edjsHTML();
  const content = edjsParser.parse(JSON.parse(page.content));

  return(
    <div className="container px-4 mx-auto py-10">
      <Head>
        <title>Loja Saudável - {page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-4">
        <div>
          <h3 className="font-semibold mb-3">Menu</h3>
          <FooterMenu />
        </div>
        <div className="col-span-3">
          <h3 className="text-3xl pb-3 border-b mb-4">{page.title}</h3>
          {content.map((item, key) =>
            <div className="html-content" key={key} dangerouslySetInnerHTML={{ __html: item}} />
          )}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const pages = await apolloClient.query({
    query: gql`
      query Pages{
        pages(first: 100){
          edges{
            node{
              slug
            }
          }
        }
      }
    `,
    variables: {
      first: 100
    }
  })

  const paths = pages.data.pages.edges.map(({node}) => ({
    params: { slug: node.slug },
  }))

  return { paths, fallback: 'blocking'}
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const page = await apolloClient.query({
    query: gql`
      query Page($slug: String!){
        page(slug: $slug){
          id
          title
          content
        }
      }
    `,
    variables: {
      slug: context.params.slug
    }
  });

  return {
    props: {
      page: page.data.page
    },
    revalidate: 1000,
  }
}

export default Page