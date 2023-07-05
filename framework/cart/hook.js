import { initializeApollo } from "../../lib/apolloClient"
import { toast } from 'react-toastify';
import { useContext } from 'react'
import Cookies from 'js-cookie'
import { CartContext } from "./context";

import * as ga from '../../lib/analytics'

import {
  checkoutQuery
} from './queries'

import {
  checkoutCreateMutation,
  checkoutLinesAddMutation,
  checkoutLinesUpdateMutation,
  checkoutLineDeleteMutation,
  checkoutCustomerAttachMutation,
  checkoutShippingAddressUpdateMutation,
  checkoutBillingAddressUpdateMutation,
  checkoutPaymentCreateMutation,
  checkoutCompleteMutation,
  checkoutShippingMethodUpdateMutation,
  checkoutAddPromoCodeMutation,
  checkoutRemovePromoCodeMutation
} from './mutations'


export function useCart(){
  const {
    cart,
    loading,
    open,
    order,
    setCart,
    setLoading,
    setOpen,
    setOrder,
    setFinalized
   } = useContext(CartContext)

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
      ga.beginCheckout()
    } else {
      const errors = response.data.checkoutCreate.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
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
        lines.forEach((line) => ga.addToCart(line.quantity, line.variantId))
      } else {
        const errors = response.data.checkoutLinesAdd.checkoutErrors
        errors.forEach(element => {
          toast.error(element.message, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        });
      }
      return response
    } else {
      return checkoutCreate(lines)
    }
  };

  const checkoutLinesUpdate = async (lines) => {
    const response = await apolloClient.mutate({
      mutation: checkoutLinesUpdateMutation, 
      variables: {checkoutId: cart.id, lines: lines},
    })
    const checkout = response.data.checkoutLinesUpdate.checkout
    if(checkout){
      setCart(checkout)
      lines.forEach((line) => ga.addToCart(line.quantity, line.variantId))
    } else {
      const errors = response.data.checkoutLinesUpdate.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
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
    } else {
      const errors = response.data.checkoutLineDelete.checkoutErrors
      errors.forEach(element => {
        toast.error(element.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
    }
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
      ga.checkoutProgress()
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
      ga.addPaymentInfo()
      setCart(response.data.checkoutPaymentCreate.checkout)
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
      ga.purchase(cart)
      setFinalized(true)
      setOrder(order)
      localStorage.setItem('order', JSON.stringify(order))
    }
    return response
  };

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

  const checkoutAddPromoCode = async (promoCode) => {
    const response = await apolloClient.mutate({
      mutation: checkoutAddPromoCodeMutation,
      variables: {checkoutId: cart.id, promoCode: promoCode}
    })
    if(response.data.checkoutAddPromoCode.checkout){
      setCart(response.data.checkoutAddPromoCode.checkout)
    }
    return response
  }

  const checkoutRemovePromoCode = async (promoCode) => {
    const response = await apolloClient.mutate({
      mutation: checkoutRemovePromoCodeMutation,
      variables: {checkoutId: cart.id, promoCode: promoCode}
    })
    if(response.data.checkoutRemovePromoCode.checkout){
      setCart(response.data.checkoutRemovePromoCode.checkout)
    }
    return response
  }

  const getCheckout = async (token) => {
    const response = await apolloClient.query({query: checkoutQuery, variables: {
      token: token
    }})
    if(response.data.checkout){
      setCart(response.data.checkout)
    } else {
      Cookies.remove('checkoutId')
      Cookies.remove('checkoutToken')
    }
  }

  const clearCart = () => {
    setCart(null)
    Cookies.remove("checkoutId")
    Cookies.remove("checkoutToken")
  }
  
  const initialize = async () => {
    const token = Cookies.get('checkoutToken')
    if(token){
      await getCheckout(token)
    }
    setLoading(false)
  }

  return {
    cart,
    order,
    open,
    loading,
    setOpen,
    initialize,
    getCheckout,
    checkoutCreate,
    checkoutLinesAdd,
    checkoutLinesUpdate,
    checkoutLineDelete,
    checkoutCustomerAttach,
    checkoutAddPromoCode,
    checkoutRemovePromoCode,
    checkoutShippingAddressUpdate,
    checkoutBillingAddressUpdate,
    checkoutShippingMethodUpdate,
    checkoutPaymentCreate,
    checkoutComplete,
    clearCart
  }

}

export default useCart