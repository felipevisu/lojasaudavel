import 'tailwindcss/tailwind.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../assets/fonts.css'
import '../assets/global.css'

import { CommerceProvider } from '../framework';
import { Layout } from '../components/common'

function App({ Component, pageProps }) {
  
  return (
    <CommerceProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommerceProvider>
  )
}

export default App
