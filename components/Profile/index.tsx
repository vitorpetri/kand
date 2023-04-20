import { image } from '@prismicio/helpers/dist/isFilled'
import styles from './styles.module.sass'

import * as prismicH from "@prismicio/helpers"

export default function Profile({ data }) {

    const profile = data.slices.find((slice) => slice.variation === 'profile')
    const accomplishments = data.slices.filter((slice) => slice.variation === 'accomplishments')

    // profile.items.forEach(item => {
    //     console.log(item)
    // })

  return (
    <div className={styles.wrapper}>
        <div className={styles.info}>
        <h1 className={styles.name}>{profile.primary.name}</h1>
        <h1 className={styles.surname}>{profile.primary.last_name}</h1>
        <h2 className={styles.role}>{profile.primary.role}</h2>
        <img
            className={styles.image}
            src={prismicH.asImageSrc(profile.primary.image, {
              lossless: true,
              q: 100
            }) || ''}
            alt={profile.name}
          />
        </div>
        <div className={styles.content}>
            {accomplishments.map((slice, index) => (
                <ul key={index} className={styles.paragraph}>
                    <h3 className={styles.title}>{slice.primary.topic}</h3>
                    {slice.items.map((item) => (
                        <div>
                            <p className={styles.text}>{item.item}</p>
                            <p className={styles.description}>{item.sub_item}</p>
                        </div>
                    ))}
                </ul>
            ))}
        </div>
    </div>
)}
