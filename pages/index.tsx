import MundoSvg from '@/public/mundo.svg';
import Image from 'next/image';
import Head from 'next/head'

import styles from './styles.module.sass'

export default function Home() {
  return (
    <>
      <Head>
        <title>KAUE & DALTRO</title>
        <meta name="description" content="Design Duo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mundo.svg" />
      </Head>
      <main>
        <div className={styles.wrapper}>
          <p className={styles.paragraph}>
            we are a creative duo working <br/> together since that year people thought <br/>
            nobody would ever work together again.
          </p>
          <div className={styles.title}>
            <h1 className={styles.name}>KAUE</h1>
            <Image src={MundoSvg} alt="World"/>
            <h1 className={styles.name}>DALTRO</h1>
          </div>
          <p className={styles.paragraph}>
            with almost a decade of experience, 
            we've done <br/> a little bit of everything. So tell us:
          </p>
          <p className={styles.paragraph}>
            what do you wanna see today?
          </p>
          <div className={styles.buttons__wrapper}>
            <a href="" className={styles.button}>
              All projects
            </a>
            <a href="" className={styles.button}>
              Categories
            </a>
          </div>
        </div>
      </main>
    </>
  )
}