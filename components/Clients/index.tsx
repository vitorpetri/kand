import { log } from 'console'
import styles from './styles.module.sass'

import * as prismicH from "@prismicio/helpers"

export default function Clients({ data }) {
  return <div className={styles.wrapper}>
    <h1 className={styles.title}>Clients</h1>

    <div className={styles.clients}>
      {data.clients.map((content, index) => {
        if (content.topic) { return (
          <div className={styles.type__title} key={index}>{content.topic}</div>
      )} else if (content.image.url) { return (
          <figure key={index} className={styles.client__image}>
            <img src={prismicH.asImageSrc(content.image, {lossless: true, q: 100}) || ''} alt={content.image.alt} />
          </figure>
      )}})}
    </div>
  </div>
}