import Head from 'next/head'
import Link from 'next/link'

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
      <SeparatorLine />
      <Gallery />
      <SeparatorLine />
      <span className={styles.footer__label}>or choose by</span>
      <Link href={'/categories'} className={styles.footer__title}>Categories</Link>
    </div>
  </>
}