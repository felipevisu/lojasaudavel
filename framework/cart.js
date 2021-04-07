import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { useState, useEffect } from 'react'

import { addressFragment } from './fragments'

const checkoutFragment = gql`
  ${addressFragment}
  fragment CheckoutFragment on Checkout {
    id
    token
    quantity
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
          url
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
            url
          }
        }
      }
    }
  }
`

const checkoutCreateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutCreate($lines: [CheckoutLineInput]!, $channel: String!) {
    checkoutCreate(input: {lines: $lines, channel: $channel}){
      checkoutErrors{
        code
        message
        field
      }
      checkout{
        ...CheckoutFragment
      }
    }
  }
`

const checkoutLinesAddMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLinesAddMutation($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lines){
      checkoutErrors{
        code
        message
        field
      }
      checkout{
        ...CheckoutFragment
      }
    }
  }
`

const checkoutLinesUpdateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLinesUpdateMutation($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines){
      checkoutErrors{
        code
        message
        field
      }
      checkout{
        ...CheckoutFragment
      }
    }
  }
`

const checkoutLineDeleteMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLineDeleteMutation($checkoutId: ID!, $lineId: ID!) {
    checkoutLineDelete(checkoutId: $checkoutId, lineId: $lineId){
      checkoutErrors{
        code
        message
        field
      }
      checkout{
        ...CheckoutFragment
      }
    }
  }
`

const checkout = gql`
  ${checkoutFragment}
  query Checkout($token: UUID!) {
    checkout(token: $token){
      ...CheckoutFragment
    }
  }
`

export function useCart(){
  const [cart, setCart] = useState(null)
  const [open, setOpen] = useState(false)

  const apolloClient = initializeApollo();

  const checkoutCreate = async (lines) => {
    const channel = "casa-nature"
    const response = await apolloClient.mutate({
      mutation: checkoutCreateMutation, 
      variables: {lines: lines, channel: channel}
    })
    const checkout = response.data.checkoutCreate.checkout
    if(checkout){
      setCart(checkout)
      Cookies.set('checkoutId', checkout.id, { expires: 7 })
      Cookies.set('checkoutToken', checkout.token, { expires: 7 })
    }
    return response
  };

  const checkoutLinesAdd = async (lines) => {
    if(cart){
      const response = await apolloClient.mutate({
        mutation: checkoutLinesAddMutation, 
        variables: {checkoutId: cart.id, lines: lines}
      })
      const checkout = response.data.checkoutLinesAdd.checkout
      if(checkout){
        setCart(checkout)
      }
      return response
    } else {
      return checkoutCreate(lines)
    }
  };

  const checkoutLinesUpdate = async (lines) => {
    const response = await apolloClient.mutate({
      mutation: checkoutLinesUpdateMutation, 
      variables: {checkoutId: cart.id, lines: lines}
    })
    const checkout = response.data.checkoutLinesUpdate.checkout
    if(checkout){
      setCart(checkout)
    }
    return response
  };

  const checkoutLineDelete = async (lineId) => {
    const response = await apolloClient.mutate({
      mutation: checkoutLineDeleteMutation, 
      variables: {checkoutId: cart.id, lineId: lineId}
    })
    const checkout = response.data.checkoutLineDelete.checkout
    if(checkout){
      setCart(checkout)
    }
  };

  const getCheckout = async (token) => {
    const response = await apolloClient.query({query: checkout, variables: {token: token}})
    if(response.data.checkout){
      setCart(response.data.checkout)
    }
  }

  useEffect(() => {
    const token = Cookies.get('checkoutToken')
    if(token){
      getCheckout(token)
    }
  }, [])

  return {
    cart,
    open,
    setOpen,
    setCart,
    checkoutCreate,
    checkoutLinesAdd,
    checkoutLinesUpdate,
    checkoutLineDelete
  }

}

export default useCart