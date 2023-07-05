import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"

const SlideFragment = gql`
  fragment SlideFragment on Slide{
    id
    alt
    image
    category{
      slug
    }
    collection{
      slug
    }
    page{
      slug
    }
  }
`

export const querySlideshow = gql`
  ${SlideFragment}
  query Slideshow(
    $name: String
  ){
    slideshow(name: $name){
      slides {
        ...SlideFragment
      }
    }
  }
`;

export async function getSlideshow(name){
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: querySlideshow, variables: {name: name}});
  return response.data.slideshow
}

export default getSlideshow