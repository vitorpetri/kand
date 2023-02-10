import Head from 'next/head'

import styles from './styles.module.sass'

export default function Home() {
  return (
    <>
      <Head><title>KAUE & DALTRO | About </title></Head>
      <main>
        <div className={styles.wrapper} >About</div>
      </main>
    </>
  )
}