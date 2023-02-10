import 'styles/index.scss'

import Lenis from 'utils/scroll'

import type { AppProps } from 'next/app'

// import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  Lenis

  return <>
    <div className="navigation">
      <div className="header"></div>
      <div className="frame">
        <Component {...pageProps} />
      </div>
    </div>
  </>
}
