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
                <h1 className={styles.name}>{profileData.primary.name}</h1>
                <h1 className={styles.surname}>{profileData.primary.last_name}</h1>
                <h2 className={styles.role}>{profileData.primary.role}</h2>
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
                    <h3 className={styles.title}>{slice.primary.topic}</h3>
                    {slice.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                        <p className={styles.text}>{item.item}</p>
                        <p className={styles.description}>{item.sub_item}</p>
                        </div>
                    ))}
                    </ul>
                ))}
                </div>
            </div>
        </>
    ))}
  </>
)}
