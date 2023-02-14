import Head from 'next/head'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'

export default function Home() {
  return <>
    <Head><title>KAND | All projects </title></Head>
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>All Projects</h1>
      </div>

      <SeparatorLine />
      <Gallery />
    </main>
  </>
}