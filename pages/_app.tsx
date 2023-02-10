import 'styles/index.scss'
import MundoSvg from '@/public/mundo.svg';
import Image from 'next/image';
import Lenis from 'utils/scroll'

import type { AppProps } from 'next/app'

// import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  Lenis

  return <>
    <div className="navigation">
      <div className="header">
        <div className="logo"><Image src={MundoSvg} alt="World"/></div>
        <div className="menu"><div className="icon">+</div></div>
      </div>
      <div className="frame">
        <Component {...pageProps} />
      </div>
    </div>
  </>
}
