import Line from '@/components/Line'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import AtomoSvg from 'public/atomo.svg'

import styles from './styles.module.sass'

import Crew from '@/components/Crew'

import * as prismicH from "@prismicio/helpers"

export default function Projects({project}) {
  return ( 
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.client_label}>Client</div>
        <div className={styles.client}>{project.client}</div>

        <div className={styles.title} dangerouslySetInnerHTML={{ __html: project.title }} />

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
          <div key={index} className={`image-${content.size} images`}>
            <img
              src={prismicH.asImageSrc(content.image, {lossless: true, q: 100}) || ''}
              alt={content.image.alt}/>
          </div>
        )}})}

      <ul className={styles.numbers}>
        {/* {project.forEach(numbers => { */}
        {project.numbers.map((number, index) => { return (
          <li className={styles.numbers__item} key={index}>
            <div className={styles.numbers__title}>{number.title}</div>
            <div className={styles.numbers__description}>{number.description}</div>
          </li>
        )})}
      </ul>

      <div className={styles.banner}>
        <div className={styles.banner__title}>{project.banner_title}</div>
        <div className={styles.banner__description}>{project.banner_description}</div>
      </div>

      <div className={styles.info}>
        <Crew data={project} />

        <div className={styles.categories}>
          <div className={styles.categories__title}>Categories</div>
          <ul className={styles.categories__list}>
            <li className={styles.categories__item}>Branding</li>
            <li className={styles.categories__item}>Best Use Of Media</li>
            <li className={styles.categories__item}>Design</li>
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <Link href={'/'} className={styles.footer__button}>Previous</Link>
        <Image className={styles.footer__icon} src={AtomoSvg} alt="Atom"/>
        <Link href={'/'} onClick={()=> console.log(projectsList)} className={styles.footer__button}>Next</Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { uid } = context.params

  const client = createClient({ accessToken: sm.token })
  const res = await client.getByUID('project', uid)

  if (!res) return { notFound: true }

  const project = res.data

  console.log(project.numbers[0].title)

  return {
    props: {
      project
    }
  }
}