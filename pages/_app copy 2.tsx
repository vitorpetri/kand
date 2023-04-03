import { Html, Head, Main, NextScript } from 'next/document'

import 'styles/index.sass'
import Lenis from '@/utils/scroll'

import Navigation from '@/components/Navigation'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  Lenis

  return <Html lang="en">
    <Head>
      <meta name="description" content="Design Duo" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/mundo.svg" />
    </Head>
    <Navigation />
    <div className="grain" />
    <main className='content'>
      <Component {...pageProps} />
    </main>
  </Html>
}


      
    
