import Head from 'next/head'

import styles from './styles.module.sass'

export default function Categories() {
  return <>
    <Head><title>KAND | Categories</title></Head>
    <main>
      <div className={styles.wrapper}>Categories</div>
    </main>
  </>
}
