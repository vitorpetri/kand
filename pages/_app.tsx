import 'styles/index.scss'

import type { AppProps } from 'next/app'

// import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <div className="navigation">
      <div className="header"></div>
      <div className="frame">
        <Component {...pageProps} />
      </div>
    </div>
  </>
}
