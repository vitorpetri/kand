import Head from 'next/head'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'
import Line from '@/components/Line'

export default function Categories() {
  return <>
    <Head>
      <title>KAND | Categories</title>
    </Head>

    <div className={styles.wrapper}>
      <h1 className={styles.title}>Categories</h1>
      <Line />

      <div className={styles.filters}>
        <div className={styles.category}>Category 1</div>
        <div className={styles.category}>Category 2</div>
        <div className={styles.category}>Category 3</div>
      </div>

      <SeparatorLine />
      <Gallery />
    </div>
  </>
}
