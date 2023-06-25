import React from 'react'

import styles from './styles.module.sass'

import { useRef, useEffect } from 'react'
import GSAP from 'gsap'

function addLineBreak(str) {
    const input = str || ''
    const lines = input.split('\n')
    const modifiedLines = lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
        </React.Fragment>
    ))
    return modifiedLines
}

export default function Awards({ data }) {
    const awards = data.slices2.filter((slice) => slice.variation === 'awardCategories')

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
            <h1 className={styles.title}>{data.award_title}</h1>

            <div className={styles.content}>
                {awards.map(slice => (
                    <div className={styles.awards__wrapper}>
                        <div className={styles.awards__title}>{slice.primary.award}</div>
                        <ul className={styles.awards}>
                            {slice.items.map(item => (
                                <li className={styles.award} ref={addFadeInRef}>
                                    <h3 className={styles.award__title} dangerouslySetInnerHTML={{ __html: item.title }} />
                                    <p className={styles.award__item}>{addLineBreak(item.sub_title)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
