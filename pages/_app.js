import 'tailwindcss/tailwind.css'
import '../assets/fonts.css'
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
