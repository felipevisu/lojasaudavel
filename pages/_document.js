import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/analytics'
import { FB_PIXEL_ID } from '../lib/fpixel'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Regular.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Demi.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Bold.woff2" as="font" crossOrigin="" />

          <meta name='application-name' content='Loja Saudável' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Loja Saudável' />
          <meta
            name="description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
            Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e 
            todos que buscam uma vida mais saudável." 
          />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#38A169' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#FFFFFF' />

          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16.png' />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />

          <meta property='og:type' content='website' />
          <meta property='og:title' content='Loja Saudável' />
          <meta 
            property='og:description' 
            content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
            Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e 
            todos que buscam uma vida mais saudável." 
          />
          <meta property='og:site_name' content='Loja Saudável' />
          <meta property='og:url' content='https://lojasaudavel.com.br' />
          <meta property='og:image' content='https://lojasaudavel.com.br/apple-touch-icon.png' />

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
          <script 
            dangerouslySetInnerHTML={{
              __html: `
              window._mfq = window._mfq || [];
              (function() {
                var mf = document.createElement("script");
                mf.type = "text/javascript"; mf.defer = true;
                mf.src = "//cdn.mouseflow.com/projects/f091220d-4693-4adb-a338-89752d2227b3.js";
                document.getElementsByTagName("head")[0].appendChild(mf);
              })();
              `
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