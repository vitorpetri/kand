import 'styles/index.sass'
import Lenis from 'utils/scroll'

import Navigation from 'components/Navigation'
import TransitionLayout from 'components/app/TransitionLayout'

// import { Noise } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
// import { Canvas } from '@react-three/fiber'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  Lenis

  return <>
    <TransitionLayout>
      <div className="app">
        <Navigation />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </TransitionLayout>
  </>
}
