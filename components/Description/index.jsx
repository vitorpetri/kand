import styles from './styles.module.sass'

import Line from '@/components/Line'

export default function Profile({data}) {
  return <div className={styles.description}>
    <h3 className={styles.description__title}>
      {data.description.map((description, index) => (
        <span key={index} onClick={() => {}} className={styles.description__title}>
          {description.title ? description.title : ''}
        </span>
      ))}
    </h3>

    <div className={styles.description__text}>
      {data.description.map((description, index) => (
        <p key={index} onClick={() => {}} className={styles.description__paragraph}>
          {description.text ? description.text : ''}
        </p>
      ))}
    </div>
    <Line />
  </div>
}