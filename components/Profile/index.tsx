import { image } from '@prismicio/helpers/dist/isFilled'
import styles from './styles.module.sass'

import * as prismicH from "@prismicio/helpers"

export default function Profile({ data }) {

    const profileData = data.profile
    const profile = profileData[0]

    console.log(profile)

  return (
    <div className={styles.wrapper}>
        <div className={styles.info}>
        <h1 className={styles.name}>{profile.name}</h1>
        <h1 className={styles.surname}>{profile.last_name}</h1>
        <h2 className={styles.role}>{profile.role}</h2>
        <img
            className={styles.image}
            src={prismicH.asImageSrc(profile.image, {
              lossless: true,
              q: 100
            }) || ''}
            alt={profile.name}
          />
        </div>
        <div className={styles.content}>
        <ul className={styles.paragraph}>
            <h3 className={styles.title}>{profile.topic}</h3>
            <p className={styles.text}>{profile.item}</p>
            <p className={styles.description}>{profile.sub_item}</p>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
        </ul>
        <ul className={styles.paragraph}>
            <h3 className={styles.title}>Previous Experience</h3>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
        </ul>
        <ul className={styles.paragraph}>
            <h3 className={styles.title}>Previous Experience</h3>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
        </ul>
        <ul className={styles.paragraph}>
            <h3 className={styles.title}>Previous Experience</h3>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
            <p className={styles.text}>AFIRCA DDB</p>
            <p className={styles.description}>2021</p>
        </ul>
        </div>
    </div>
)}
