import { gql } from 'graphql-request'
import { graphqlClient } from '../lib/graphqlClient'

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
  const slideshow = await graphqlClient.request(querySlideshow,  {name: name});
  return slideshow.slideshow
}

export default getSlideshow