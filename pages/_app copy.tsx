import { Head } from 'next/document'

import 'styles/index.sass'
import Lenis from '@/utils/scroll'

import Navigation from '@/components/Navigation'
import Main from '@/components/app/Main'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import GSAP from 'gsap'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const { events } = useRouter()

  Lenis

  useEffect(() => {
    events.on('routeChangeComplete', () => {
      GSAP.to('main', { autoAlpha: 1, duration: 0.6 })
      window.scroll(0, 0)
    })
  }, [])

  return <>
    <Head>
        <meta name="description" content="Design Duo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mundo.svg" />
    </Head>
    <Navigation />
    <div className="grain" />
    <Main>
      <Component {...pageProps} />
    </Main>
  </>
}

      
    

      
    
