import styles from './styles.module.sass'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import * as prismicH from "@prismicio/helpers"

export default function Gallery({ projectsList }) {
  const { prefetch } = useRouter()

  // const { ref: projectRef, inView: projectsIsVisible, entry } = useInView() 

  useEffect(() => {
    projectsList.forEach(project => {
      prefetch(`/project/${project.id}`)
    })

    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     setIsIntersecting(entry.isIntersecting)
    //   }
    // )
  }, [])

  return (
    <aside className={styles.gallery}>
      {projectsList.map(({ id, title, cover, client, agency }, index) => (
        // <motion.div 
        //   initial={{ translateY: '10rem', opacity: 0 }}
        //   animate={{ translateY: 0, opacity: 1 }}
        //   exit={{ left: '50%' }} 
        //   transition={{ delay: 1 }}
        //   className={styles.project__wrapper} key={index}
        // >
        <div className={styles.project__wrapper}>
          <Link 
            href={`/project/${id}`} 
            className={styles.project}
            // className={`${styles.project} ${projectsIsVisible ? styles.animateProject : ''}`}
            key={`project-${index}`}
            // ref={projectRef}
          >
          <img
            className={styles.project__image}
            src={prismicH.asImageSrc(cover, {
              lossless: true,
              q: 100
            }) || ''}
            alt={title}
          />
          <div className={styles.project__hover}>
            <p className={styles.project__hover__client__label}>Client</p>
            <p className={styles.project__hover__client} dangerouslySetInnerHTML={{ __html: client }} />
            <h3 className={styles.project__hover__title} dangerouslySetInnerHTML={{ __html: title }} />
            <p className={styles.project__hover__agency__label}>Agency</p>
            <p className={styles.project__hover__agency} dangerouslySetInnerHTML={{ __html: agency }} />
            <div className={styles.project__hover__plus__wrapper}>
              <span className={styles.project__hover__plus}>+</span>
            </div>
          </div>
          </Link>
          <h3 className={styles.project__title} dangerouslySetInnerHTML={{ __html: title }} />
        {/* </motion.div> */}
        </div>
      ))}
    </aside>
  )
}