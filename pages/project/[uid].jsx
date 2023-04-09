import Line from '@/components/Line'
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
        )} else if (!content.video == undefined) { return (
          <div key={index} className={styles.content_video}>
            <iframe
              src={content.video.embed_url}
              width="640" height="360"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        )} else if (content.image) { return (
          <img
            key={index}
            className={`image-${content.size}`}
            src={prismicH.asImageSrc(content.image, {lossless: true, q: 100}) || ''}
            alt={project.content.title}/>
        )}})}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { uid } = context.params

  const client = createClient({ accessToken: sm.token })
  const res = await client.getByUID('project', uid)

  if (!res) return { notFound: true }

  const project = res.data

  console.log(project.content[2])

  return {
    props: {
      project
    }
  }
}