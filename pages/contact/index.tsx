import Head from 'next/head'

import styles from './styles.module.sass'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import { log } from 'console'

type Page = {
  data: {
    title: string
  }
}

export default function Contact(data) {
  return <>
    <Head>
      <title>KAND | Contact</title>
    </Head>

    <div className={styles.wrapper}>
      <div className={styles.paragraph} dangerouslySetInnerHTML={{__html: data.paragraph}} />

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
          <div className={styles.title}>{ data.info_1[0].name }</div>
          <a className={styles.link} href={ data.info_1[0].social_1_link } target='blank'>{ data.info_1[0].social_1 }</a>
          <a className={styles.link} href={ data.info_1[0].social_2_link } target='blank'>{ data.info_1[0].social_2 }</a>
          <span className={styles.phone}>{ data.info_1[0].phone }</span>
        </div>

        <div className={styles.name}>
          <div className={styles.title}>{ data.info_2[0].name }</div>
          <a className={styles.link} href={ data.info_2[0].social_1_link } target='blank'>{ data.info_2[0].social_1 }</a>
          <a className={styles.link} href={ data.info_2[0].social_2_link } target='blank'>{ data.info_2[0].social_2 }</a>
          <span className={styles.phone}>{ data.info_2[0].phone }</span>
        </div>
      </div>

      <a className={styles.email} href="mailto:kaueanddaltro@gmail.com">{ data.email }</a>
    </div>
  </>
}

export async function getServerSideProps() {
  const client = createClient({ accessToken: sm.token })

  const contact = await client.getByType('contact')
  const data = contact?.results[0]?.data

  return {
    props: { ...data },
  }
}