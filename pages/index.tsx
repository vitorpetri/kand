import Head from 'next/head'
import MundoSvg from 'public/mundo.svg'
import Image from 'next/image'
import Link from 'next/link'

import Line from '@/components/Line'

import styles from './styles.module.sass'

export default function Home() {
  return <>
    <Head>
      <title>KAUE & DALTRO</title>
    </Head>
    <div className={styles.wrapper}>
      <p className={styles.paragraph}>
        we are a creative duo working <br/> 
        together since that year people thought <br/>
        nobody would ever work together again.
      </p>
      <div className={styles.title}>
        {/* <span className={styles.label}>11</span> */}
        {/* <div className={styles.accent}></div> */}
        <h1 className={styles.name}>KAUE</h1>
        <Line />
        <Image className={styles.icon} src={MundoSvg} alt="World"/>
        <Line />
        <h1 className={styles.name}>DALTRO</h1>
        {/* <span className={styles.label}>21</span> */}
      </div>
      <p className={styles.paragraph}>
        with almost a decade of experience, we've done <br/> 
        a little bit of everything. So tell us:
      </p>
      <p className={styles.paragraph__mobile}>
        with almost a decade of experience, <br/> 
        we've done a little bit of everything. <br/> 
        So tell us:
      </p>
      <p className={styles.paragraph}>
        what do you wanna see today?
      </p>
      <div className={styles.buttons__wrapper}>
        <Link href={"/projects"} className={styles.button}>
          All projects
        </Link>
        <Link href={"/categories"} className={styles.button}>
          Categories
        </Link>
      </div>
    </div>
  </>
}