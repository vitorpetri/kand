import Head from 'next/head'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'

export default function Categories() {
  return <>
    <Head><title>KAND | Categories</title></Head>
    <main>
      <div className={styles.wrapper}>
        KAUE & DALTRO
      </div>
    </main>
  </>
}
