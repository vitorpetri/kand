import styles from './styles.module.sass'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLayoutEffect, useRef } from 'react'
import * as prismicH from "@prismicio/helpers"
import { gsap } from 'gsap'


export default function Gallery({ projectsList }) {
    const { prefetch } = useRouter()
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        projectsList.forEach(project => {
            prefetch(`/project/${project.id}`)
        })

        if (containerRef.current) {
            gsap.set(containerRef.current.children, { opacity: 0, y: 20 });
            const tl = gsap.timeline();
            tl.to(containerRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
            });
        }
    }, [projectsList])

    return (
        <aside className={styles.gallery} ref={containerRef}>
            {projectsList.map(({ id, title, cover, client, agency }, index) => (
                <div className={styles.project__wrapper} key={index}>
                    <Link href={`/project/${id}`} className={styles.project}>
                        <img
                            className={styles.project__image}
                            src={prismicH.asImageSrc(cover, {
                                lossless: true,
                                q: 100
                            }) || ''}
                            alt={title}
                        />
                        <div className={styles.project__hover}>
                            <p className={styles.project__hover__client__label}>Client</p>
                            <p className={styles.project__hover__client} dangerouslySetInnerHTML={{ __html: client }} />
                            <h3 className={styles.project__hover__title} dangerouslySetInnerHTML={{ __html: title }} />
                            <p className={styles.project__hover__agency__label}>Agency</p>
                            <p className={styles.project__hover__agency} dangerouslySetInnerHTML={{ __html: agency }} />
                            <div className={styles.project__hover__line} />
                            <div className={styles.project__hover__plus__wrapper}>
                                <span className={styles.project__hover__plus}><div>+</div></span>
                            </div>
                        </div>
                    </Link>
                    <h3 className={styles.project__title} dangerouslySetInnerHTML={{ __html: title }} />
                </div>
            ))}
        </aside>
    )
}
