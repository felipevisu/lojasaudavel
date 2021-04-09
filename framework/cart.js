import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { useState, useEffect } from 'react'

import { addressFragment } from './fragments'
import { useRouter } from "next/router";

const checkoutFragment = gql`
  ${addressFragment}
  fragment CheckoutFragment on Checkout {
    id
    token
    quantity
    email
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

const checkoutCustomerAttachMutation = gql`
  ${checkoutFragment}
  mutation CheckoutCustomerAttachMutation($checkoutId: ID!, $customerId: ID!) {
    checkoutCustomerAttach(checkoutId: $checkoutId, customerId: $customerId){
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

const checkoutShippingAddressUpdateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutShippingAddressUpdate($checkoutId: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress){
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

const checkoutBillingAddressUpdateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutBillingAddressUpdate($checkoutId: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress){
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

const checkoutShippingMethodUpdateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutShippingMethodUpdate($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId){
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

const checkoutPaymentCreateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutPaymentCreate($checkoutId: ID!, $input: PaymentInput!) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $input){
      paymentErrors{
        code
        message
        field
      }
      payment{
        id
        token
        gateway
        installments
        paymentMethodType
        total{
          amount
        }
      }
      checkout{
        ...CheckoutFragment
      }
    }
  }
`
const checkoutCompleteMutation = gql`
  mutation CheckoutComplete($checkoutId: ID!, $paymentData: JSONString) {
    checkoutComplete(checkoutId: $checkoutId, paymentData: $paymentData){
      checkoutErrors{
        code
        message
        field
      }
      order{
        id
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
  const router = useRouter()
  const [cart, setCart] = useState(null)
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [cartLoading, setCartLoading] = useState(true)

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
    } else {
      const errors = response.data.checkoutCreate.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    }
    localStorage.removeItem('data_payment')
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
      } else {
        const errors = response.data.checkoutLinesAdd.checkoutErrors
        errors.forEach(element => {
          toast.error(element.message, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        });
      }
      localStorage.removeItem('data_payment')
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
    } else {
      const errors = response.data.checkoutLinesUpdate.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    }
    localStorage.removeItem('data_payment')
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
    } else {
      const errors = response.data.checkoutLineDelete.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    }
    localStorage.removeItem('data_payment')
  };

  const checkoutCustomerAttach = async (customerId) => {
    const response = await apolloClient.mutate({
      mutation: checkoutCustomerAttachMutation, 
      variables: {checkoutId: cart.id, customerId: customerId}
    })
    const checkout = response.data.checkoutCustomerAttach.checkout
    if(checkout){
      setCart(checkout)
    }
  };

  const checkoutShippingAddressUpdate = async (shippingAddress) => {
    const response = await apolloClient.mutate({
      mutation: checkoutShippingAddressUpdateMutation, 
      variables: {checkoutId: cart.id, shippingAddress: shippingAddress}
    })
    if(response.data.checkoutShippingAddressUpdate.checkout){
      setCart(response.data.checkoutShippingAddressUpdate.checkout)
    }
    return response
  };

  const checkoutBillingAddressUpdate = async (billingAddress) => {
    const response = await apolloClient.mutate({
      mutation: checkoutBillingAddressUpdateMutation, 
      variables: {checkoutId: cart.id, billingAddress: billingAddress}
    })
    if(response.data.checkoutBillingAddressUpdate.checkout){
      setCart(response.data.checkoutBillingAddressUpdate.checkout)
    }
    return response
  };

  const checkoutPaymentCreate = async (input) => {
    const response = await apolloClient.mutate({
      mutation: checkoutPaymentCreateMutation, 
      variables: {checkoutId: cart.id, input: input}
    })
    if(response.data.checkoutPaymentCreate.checkout){
      setCart(response.data.checkoutPaymentCreate.checkout)
    }
    if(response.data.checkoutPaymentCreate.payment){
      localStorage.setItem("data_payment", JSON.stringify(response.data.checkoutPaymentCreate.payment));
    }
    return response
  };

  const checkoutComplete = async (paymentData) => {
    const response = await apolloClient.mutate({
      mutation: checkoutCompleteMutation, 
      variables: {checkoutId: cart.id, paymentData: paymentData}
    })
    const order = response.data.checkoutComplete.order
    if(order){
      setOrder(order)
    }
    return response
  };

  const clearCart = () => {
    setCart(false)
    localStorage.removeItem("extra_data")
    localStorage.removeItem("data_payment")
    Cookies.remove("checkoutId")
    Cookies.remove("checkoutToken")
  }

  const checkoutShippingMethodUpdate = async (shippingMethodId) => {
    const response = await apolloClient.mutate({
      mutation: checkoutShippingMethodUpdateMutation, 
      variables: {checkoutId: cart.id, shippingMethodId: shippingMethodId}
    })
    if(response.data.checkoutShippingMethodUpdate.checkout){
      setCart(response.data.checkoutShippingMethodUpdate.checkout)
    }
    return response
  };

  const getCheckout = async (token) => {
    const response = await apolloClient.query({query: checkout, variables: {token: token}})
    if(response.data.checkout){
      setCart(response.data.checkout)
    } else {
      Cookies.remove('checkoutId')
      Cookies.remove('checkoutToken')
    }
    setCartLoading(false)
  }

  useEffect(() => {
    const token = Cookies.get('checkoutToken')
    if(token){
      getCheckout(token)
    } else {
      setCartLoading(false)
    }
  }, [])

  return {
    cart,
    order,
    open,
    cartLoading,
    setOpen,
    setCart,
    checkoutCreate,
    checkoutLinesAdd,
    checkoutLinesUpdate,
    checkoutLineDelete,
    checkoutCustomerAttach,
    checkoutShippingAddressUpdate,
    checkoutBillingAddressUpdate,
    checkoutShippingMethodUpdate,
    checkoutPaymentCreate,
    checkoutComplete,
    clearCart
  }

}

export default useCart