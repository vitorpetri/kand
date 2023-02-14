import Head from 'next/head'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'

export default function Categories() {
  return <>
    <Head><title>KAND | Categories</title></Head>
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Categories</h1>
        
        <div className={styles.filters}>
          <div className={styles.categorie}>Categorie 1</div>
          <div className={styles.categorie}>Categorie 2</div>
          <div className={styles.categorie}>Categorie 3</div>
        </div>

        <SeparatorLine />
        <Gallery />
      </div>
    </main>
  </>
}
