import 'styles/index.sass'
// import Lenis from 'utils/scroll'

import Navigation from 'components/Navigation'
// import TransitionLayout from 'components/app/TransitionLayout'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  // Lenis

  return <>
    {/* <TransitionLayout> */}
      <div className="app">
        <Navigation />
        <div className="grain" />
        <main className='content'>
          <Component {...pageProps} />
        </main>
      </div>
    {/* </TransitionLayout> */}
  </>
}
