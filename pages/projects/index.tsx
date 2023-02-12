import Head from 'next/head'

import styles from './styles.module.sass'

export default function Home() {
  return <>
    <Head><title>KAND | All projects </title></Head>
    <main>
      <div className={styles.wrapper}>All Projects</div>
    </main>
  </>
}