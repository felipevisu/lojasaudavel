import { initializeApollo } from "../../lib/apolloClient"
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const [finalized, setFinalized] = useState(false)
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
      setFinalized(true)
      setOrder(order)
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
    const response = await apolloClient.query({query: checkoutQuery, variables: {token: token}})
    if(response.data.checkout){
      setCart(response.data.checkout)
    } else {
      Cookies.remove('checkoutId')
      Cookies.remove('checkoutToken')
    }
    setCartLoading(false)
  }

  const clearCart = () => {
    setCart(null)
    setFinalized(false)
    localStorage.removeItem("extra_data")
    localStorage.removeItem("data_payment")
    Cookies.remove("checkoutId")
    Cookies.remove("checkoutToken")
  }

  useEffect(() => {
    const token = Cookies.get('checkoutToken')
    if(token){
      getCheckout(token)
    } else {
      setCartLoading(false)
    }
  }, [])

  useEffect(() => {
    if(finalized){
      router.push('pedido-finalizado')
    }
  }, [finalized])

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