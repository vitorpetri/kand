import styles from './styles.module.sass'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'

import * as prismicH from "@prismicio/helpers"

export default function Gallery({ projectsList }) {
  const { prefetch } = useRouter()

  useEffect(() => {
    projectsList.forEach(project => {
      prefetch(`/project/${project.id}`)
    })
  }, [])

  return (
    <aside className={styles.gallery}>
      {projectsList.map(({ id, title, cover }, index) => (
        <div className={styles.project__wrapper} key={index}>
          <Link href={`/project/${id}`} className={styles.project} key={`project-${index}`}>
          <img
            className={styles.project__image}
            src={prismicH.asImageSrc(cover, {
              lossless: true,
              q: 100
            }) || ''}
            alt={title}
          />
          </Link>
          <h3 className={styles.project__title}>{title}</h3>
        </div>
      ))}
    </aside>
  )
}