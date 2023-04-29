import styles from './styles.module.sass'

import Line from '../../components/Line'

export default function Profile({data}) {
  return <div className={styles.description}>
    {data.description.map((description, index) => {
      if (description.title) { return (
      <h3 key={index} onClick={() => {}} className={styles.description__title}>
        {description.title ? description.title : ''}
      </h3>
    )}})}

    <div className={styles.description__text}>
      {data.description.map((description, index) => {
        if (description.text) { return (
        <p key={index} onClick={() => {}} className={styles.description__paragraph}>
          {description.text ? description.text : ''}
        </p>
      )}})}
    </div>
    <Line />
  </div>
}