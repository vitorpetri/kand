import Head from 'next/head'

import styles from './styles.module.sass'

export default function Categories() {
  return <>
    <Head>
      <title>KAND | Categories</title>
    </Head>

    <div className={styles.wrapper}>
      <div className={styles.text}>
        We're always up for a chat, <br />
        beer or to talk about any project. <br />
        So feel free to reach out ay any time.
      </div>

      <div className={styles.duo}>
        <svg className={styles.olho} viewBox="0 0 650 350" xmlns="http://www.w3.org/2000/svg">
          <path d="M334.5,321c83.7,0,151.5-67.8,151.5-151.5S418.2,18,334.5,18 M334.5,321C250.8,321,183,253.2,183,169.5
            S250.8,18,334.5,18 M334.5,321C533,321,644,169.5,644,169.5S533,18,334.5,18 M334.5,321C136,321,25,169.5,25,169.5S136,18,334.5,18
            M334.5,245c41.7,0,75.5-33.8,75.5-75.5S376.2,94,334.5,94 M334.5,245c-41.7,0-75.5-33.8-75.5-75.5S292.8,94,334.5,94 M334.5,245
            c17.7,0,32-33.8,32-75.5S352.2,94,334.5,94 M334.5,245c-17.7,0-32-33.8-32-75.5s14.3-75.5,32-75.5"
            fill="none"
            opacity="1"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className={styles.name}>
          <div className={styles.title}>KAUE</div>
          <a className={styles.link}href="#">Linkedin</a>
          <a className={styles.link}href="#">Instagram</a>
          <span className={styles.phone}>+55 11 9 9990-9819</span>
        </div>

        <div className={styles.name}>
          <div className={styles.title}>DALTRO</div>
          <a className={styles.link}href="#">Linkedin</a>
          <a className={styles.link}href="#">Instagram</a>
          <span className={styles.phone}>+55 21 9 8821 1993</span>
        </div>
      </div>

      <a className={styles.email} href="mailto:kaueanddaltro@gmail.com">kaueanddaltro@gmail.com</a>
    </div>
  </>
}
