import { gql } from "@apollo/client";
import { checkoutFragment } from './fragments'

export const checkoutCreateMutation = gql`
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

export const checkoutLinesAddMutation = gql`
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

export const checkoutLinesUpdateMutation = gql`
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

export const checkoutLineDeleteMutation = gql`
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

export const checkoutCustomerAttachMutation = gql`
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

export const checkoutShippingAddressUpdateMutation = gql`
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

export const checkoutBillingAddressUpdateMutation = gql`
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

export const checkoutShippingMethodUpdateMutation = gql`
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

export const checkoutPaymentCreateMutation = gql`
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
export const checkoutCompleteMutation = gql`
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

export const checkoutAddPromoCodeMutation = gql`
  ${checkoutFragment}
  mutation CheckoutAddPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode){
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

export const checkoutRemovePromoCodeMutation = gql`
  ${checkoutFragment}
  mutation CheckoutRemovePromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode){
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