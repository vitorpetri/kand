import styles from './styles.module.sass'

import * as prismicH from '@prismicio/helpers'

import SeparatorLine from '../SeparatorLine'

import { useRef, useEffect } from 'react'
import GSAP from 'gsap'

//map profile and accomplishments
function profileMapping(slices) {
    const profiles = []
    let currentProfile = null

    slices.filter((slice) => {
        if (slice.variation === 'profile') {
            if (currentProfile) {
                profiles.push(currentProfile)
            }
            currentProfile = { ...slice, accomplishments: [] }
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

    const fadeInRefs = useRef([])

    const addFadeInRef = (el) => {
        if (el && !fadeInRefs.current.includes(el)) {
            fadeInRefs.current.push(el)
        }
    }

    useEffect(() => {
        GSAP.set(fadeInRefs.current, { autoAlpha: 0, y: 30 })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Check if the target is one of the elements in fadeInRefs
                        if (fadeInRefs.current.includes(entry.target)) {
                            // Animate the element using GSAP
                            GSAP.to(entry.target, {
                                autoAlpha: 1,
                                duration: 1,
                                y: 0,
                                ease: 'power2',
                            });
                        } else {
                            // Only fade in for other elements
                            GSAP.to(entry.target, {
                                autoAlpha: 1,
                                duration: 1.5,
                                ease: 'power2',
                            });
                        }

                        // Optionally unobserve the target after animating
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, // Adjust this value to start animation earlier or later
            }
        )

        // Observing elements in fadeInRefs, imageRefs, and videoRefs
        fadeInRefs.current.forEach((element) => observer.observe(element))
        
        return () => {
            // Cleanup - stop observing all targets
            fadeInRefs.current.forEach((element) => observer.unobserve(element))
        }
    }, [])

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
                                <ul key={index} className={styles.paragraph} ref={addFadeInRef}>
                                    <h3 className={styles.title}>{slice.primary.topic}</h3>
                                    {slice.items.map((item, itemIndex) => (
                                        <a href={item.link} target='blank' key={itemIndex}>
                                            <p className={styles.text} dangerouslySetInnerHTML={{ __html: item.item }} />
                                            <p className={styles.description} dangerouslySetInnerHTML={{ __html: item.sub_item }} />
                                        </a>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}
