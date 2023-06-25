import styles from './styles.module.sass'

import * as prismicH from '@prismicio/helpers'

import { useRef, useEffect } from 'react'
import GSAP from 'gsap'

export default function Clients({ data }) {
    const client = data.slices1.filter((slice) => slice.variation === 'industryClients')

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
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{data.client_title}</h1>

            <div className={styles.clients}>
                {client.map((slice, index) => {
                    return (
                        <div className={styles.client} key={index}>
                            <div className={styles.type__title}>{slice.primary.topic}</div>
                                {slice.items.map((item, index) => (
                                    <div className={styles.client__image} ref={addFadeInRef}>
                                        <img src={prismicH.asImageSrc(item.logo, { lossless: true, q: 100 }) || ''} alt={item.logo.alt} key={index} />
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
