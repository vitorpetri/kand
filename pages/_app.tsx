import 'styles/index.sass'
import Lenis from 'utils/scroll'

import Navigation from 'components/Navigation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import GSAP from 'gsap'

import type { AppProps } from 'next/app'

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'

export default function App({ Component, pageProps }: AppProps) {
  const { events } = useRouter()

  Lenis

  useEffect(() => {
    events.on('routeChangeComplete', () => {
      GSAP.to('main', { autoAlpha: 1, duration: 0.6 })
      window.scroll(0, 0)
    })
  }, [])

  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      <PrismicPreview repositoryName={repositoryName}>
        <Head>
          <title>KAUE & DALTRO</title>
          <meta name="description" content="Design Duo" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/mundo.svg" />
        </Head>
        <div className="top" />
        <div className="border" />
        <div className="bottom" />
        <Navigation />
        <div className="grain" />
        <main className='content'>
          <Component {...pageProps} />
        </main>
      </PrismicPreview>
    </PrismicProvider>
  )
}