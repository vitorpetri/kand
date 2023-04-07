import styles from './styles.module.sass'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Gallery({ projectsList }) {
  const { prefetch } = useRouter()

  useEffect(() => {
    projectsList.forEach(project => {
      prefetch(`/project/${project.id}`)
    })
  }, [])

  return (
    <aside className={styles.element}>
      {projectsList.map(({ title }, index) => (
        <div className={styles.gallery}>
          <div className={styles.project}>
            <div className={styles.project__image}></div>
            <h3 className={styles.project__title}>{title}</h3>
          </div>
        </div>
      ))}
    </aside>
  )
}