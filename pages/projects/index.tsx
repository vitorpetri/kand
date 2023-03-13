import Head from 'next/head'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'
import Line from '@/components/Line'

export default function Home() {
  return <>
    <Head>
      <title>KAND | All projects </title>
    </Head>
    
    <div className={styles.wrapper}>
      <h1 className={styles.title}>All Projects</h1>
      <Line />
    
    </div>

    <SeparatorLine />
    <Gallery />
  </>
}