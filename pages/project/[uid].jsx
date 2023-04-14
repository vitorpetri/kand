import Line from '@/components/Line'
import Link from 'next/link'
import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import styles from './styles.module.sass'

import * as prismicH from "@prismicio/helpers"

export default function Projects({project}) {
  return ( 
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.client_label}>Client</div>
        <div className={styles.client}>{project.client}</div>

        <div className={styles.title}>{project.title}</div>

        <div className={styles.agency_label}>Agency</div>
        <div className={styles.agency}>{project.agency}</div>

        <Line />
      </div>

      {project.content.map((content, index) => {
        if (content.description) { return (
          <p className='description' key={index}>{content.description}</p>
        )} else if (content.video.embed_url) { return (
          <div key={index} className='video'>
            <iframe
              src={content.video.embed_url}
              className='frame'
              allow="autoplay; fullscreen; picture-in-picture"
              >
            </iframe>
          </div>
        )} else if (content.image) { return (
          <div key={index} className={`image-${content.size}`}>
            <img
              src={prismicH.asImageSrc(content.image, {lossless: true, q: 100}) || ''}
              alt={content.image.alt}/>
          </div>
        )}})}

      <ul className={styles.numbers}>
        <li className={styles.numbers__item}>
          <p className={styles.numbers__title}>300 MM</p>
          <p className={styles.numbers__description}>people reached</p>
        </li>
        <li className={styles.numbers__item}>
          <p className={styles.numbers__title}>157 K</p>
          <p className={styles.numbers__description}>bananas</p>
        </li>
        <li className={styles.numbers__item}>
          <p className={styles.numbers__title}>19 MM</p>
          <p className={styles.numbers__description}>polichinelos</p>
        </li>
      </ul>

      <div className={styles.banner}>
        <div className={styles.banner__title}>This was the most awarded campaign</div>
        <div className={styles.banner__description}>in the history of the Hungarian ad industry.</div>
      </div>

      <div className={styles.info}>
        <div className={styles.crew}>
          <div className={styles.crew__title}>Crew</div>
          <button className={styles.crew__button}>+</button>
        </div>

        <div className={styles.categories}>
          <div className={styles.categories__title}>Categories</div>
          <ul className={styles.categories__list}>
            <li className={styles.categories__item}>Branding</li>
            <li className={styles.categories__item}>Best Use Of Media</li>
            <li className={styles.categories__item}>Design</li>
          </ul>
        </div>
      </div>

      {/* <div className={styles.footer}>
        <Link href={'/'} className={styles.footer__button}>NEXT</Link>
        <button onClick={()=> console.log(projectsList)} className={styles.footer__button}>PREVIOUS</button>
      </div> */}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { uid } = context.params

  const client = createClient({ accessToken: sm.token })
  const res = await client.getByUID('project', uid)

  if (!res) return { notFound: true }

  const project = res.data

  // console.log(project.content[5].image.alt)

  return {
    props: {
      project
    }
  }
}