import { gql } from "@apollo/client";

export const addressFragment = gql`
  fragment AddressFragment on Address {
    id
    streetAddress1
    streetAddress2
    cityArea
    city
    countryArea
    postalCode
    country{
      code
    }
  }
`

export const checkoutFragment = gql`
  ${addressFragment}
  fragment CheckoutFragment on Checkout {
    id
    token
    quantity
    email
    voucherCode
    discount{
      amount
    }
    subtotalPrice{
      gross{
        amount
      }
    }
    shippingPrice{
      gross{
        amount
      }
    }
    totalPrice{
      gross{
        amount
      }
    }
    channel{
      id
      slug
    }
    shippingAddress{
      ...AddressFragment
    }
    billingAddress{
      ...AddressFragment
    }
    shippingMethod{
      id
      name
      price{
        amount
      }
    }
    availableShippingMethods{
      id
      name
      minimumDeliveryDays
      price{
        amount
      }
    }
    lines{
      id
      quantity
      totalPrice{
        gross{
          amount
        }
      }
      variant{
        id
        sku
        name
        media{
          id
          url(size: 300)
          alt
        }
        pricing{
          price{
            gross{
              amount
            }
          }
        }
        product{
          name
          thumbnail {
            url(size: 300)
          }
        }
      }
    }
  }
`