import { gql } from "@apollo/client";

export const ordersQuery = gql`
  query User{
    me{
      orders(first: 100){
        edges{
          node{
            id
            number
            token
            created
            statusDisplay
            paymentStatusDisplay
            total{
              gross{
                amount
              }
            }
          }
        }
      }
    }
  }
`

export const orderByTokenQuery = gql`
  query OrderByToken($token: UUID!){
    orderByToken(token: $token){
      id
      number
      token
      created
      subtotal{
        gross{
          amount
        }
      }
      shippingPrice{
        gross{
          amount
        }
      }
      total{
        gross{
          amount
        }
      }
      statusDisplay
      paymentStatusDisplay
      lines{
        id
        productName
        quantity
        variantName
        thumbnail{
          url
        }
        unitPrice{
          gross{
            amount
          }
        }
        totalPrice{
          gross{
            amount
          }
        }
      }
      shippingAddress{
        streetAddress1
        streetAddress2
        cityArea
        city
        countryArea
        postalCode
      }
      shippingMethod{
        name
        price{
          amount
        }
      }
    }
  }
`