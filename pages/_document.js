import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/analytics'
import { FB_PIXEL_ID } from '../lib/fpixel'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
            Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e 
            todos que buscam uma vida mais saudável." 
          />
          <meta name="creator" content="Felipe Faria" />
          <meta name="author" content="Visualize Comunicação" />
          <meta name="copyright" content="Visualize Comunicação" />
          <meta name="robots" content="FOLLOW,INDEX,ALL" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Loja Saudável - Casa Nature - Guaxupé/MG" />

          <meta property="og:description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
          Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e todos que 
          buscam uma vida mais saudável." />

          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json" />

          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#38A169" />

          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Regular.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Demi.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Bold.woff2" as="font" crossOrigin="" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;