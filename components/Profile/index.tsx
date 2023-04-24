import styles from './styles.module.sass'

import * as prismicH from "@prismicio/helpers"

import SeparatorLine from "../SeparatorLine"

//map profile and accomplishments
function profileMapping(slices) {
    const profiles = []
    let currentProfile = null

    slices.filter((slice) => {
        if (slice.variation === 'profile') {
            if (currentProfile) {
                profiles.push(currentProfile)
            }
            currentProfile = { ...slice, accomplishments: []}
        } else if (slice.variation === 'accomplishments') {
            if (currentProfile) {
                currentProfile.accomplishments.push(slice)
            }
        }
    })

    if (currentProfile) {
        profiles.push(currentProfile)
    }

    return profiles
}

export default function Profile({ data }) {
    // Profile with Accomplishments
    const PWA = profileMapping(data.slices)

    console.log(data);

  return (
    <>
    {PWA.map((profileData, index) => (
      <>
        {index > 0 && <SeparatorLine />}
            <div key={index} className={styles.wrapper}>
                <div className={styles.info}>
                <h1 className={styles.name} dangerouslySetInnerHTML={{ __html:profileData.primary.name}} />
                <h1 className={styles.surname} dangerouslySetInnerHTML={{ __html:profileData.primary.last_name}} />
                <h2 className={styles.role} dangerouslySetInnerHTML={{ __html:profileData.primary.role}} />
                <img
                    className={styles.image}
                    src={prismicH.asImageSrc(profileData.primary.image, {
                    lossless: true,
                    q: 100
                    }) || ''}
                    alt={profileData.name}
                />
                </div>
                <div className={styles.content}>
                {profileData.accomplishments.map((slice, index) => (
                    <ul key={index} className={styles.paragraph}>
                    <h3 className={styles.title} dangerouslySetInnerHTML={{ __html:slice.primary.topic}} />
                    {slice.items.map((item, itemIndex) => (
                        <a href={item.link} target='blank' key={itemIndex}>
                        <p className={styles.text} dangerouslySetInnerHTML={{ __html:item.item}} />
                        <p className={styles.description} dangerouslySetInnerHTML={{ __html:item.sub_item}} />
                        </a>
                    ))}
                    </ul>
                ))}
                </div>
            </div>
        </>
    ))}
  </>
)}
