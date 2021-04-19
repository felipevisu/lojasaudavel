export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  })
}

export const addToCart = (quantity, label) => {
  if(quantity > 0){
    window.gtag('event', 'add_to_cart', {
      event_category: 'ecommerce',
      event_label: label,
    })
  } else {
    window.gtag('event', 'remove_from_cart', {
      event_category: 'ecommerce',
      event_label: label,
    })
  }
}

export const beginCheckout = () => {
  window.gtag('event', 'begin_checkout', {
    event_category: 'ecommerce',
    event_label: 'Iniciou o checkout',
  })
}

export const checkoutProgress = () => {
  window.gtag('event', 'checkout_progress', {
    event_category: 'ecommerce',
    event_label: 'Prosseguiu com o checkout',
  })
}

export const addPaymentInfo = () => {
  window.gtag('event', 'add_payment_info', {
    event_category: 'ecommerce',
    event_label: 'Adicionou forma de pagamento',
  })
}

export const login = () => {
  window.gtag('event', 'login', {
    event_category: 'engagement',
    event_label: 'Usuário logou',
  })
}

export const register = () => {
  window.gtag('event', 'sign_up', {
    event_category: 'engagement',
    event_label: 'Usuário se cadastrou',
  })
}

export const search = (search_term) => {
  window.gtag('event', 'search', {
    event_category: 'engagement',
    search_term: search_term,
  })
}

export const purchase = (cart) => {
  var items = []
  cart.lines.forEach(line => {
    items.push({
      id: line.variant.id,
      name: line.variant.name,
      variant: line.variant.name,
      quantity: line.quantity,
      price: line.variant.price
    })
  })
  window.gtag('event', 'purchase', {
    transaction_id: cart.token,
    affiliation: "Loja Saudável",
    value: cart.total,
    currency: 'BRL',
    shipping: cart.shipping_price,
    items: items
  })
}