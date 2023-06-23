import styles from './styles.module.sass'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef, useEffect } from 'react'
import * as prismicH from "@prismicio/helpers"
import GSAP from 'gsap'


export default function Gallery({ projectsList, onMouseEnter, onMouseLeave }) {
    const { prefetch } = useRouter()
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        projectsList.forEach(project => {
            prefetch(`/project/${project.id}`)
        })

        if (containerRef.current) {
            GSAP.set(containerRef.current.children, { opacity: 0, y: 20 });
            const tl = GSAP.timeline();
            tl.to(containerRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
            });

            containerRef.current.addEventListener('mouseenter', onMouseEnter);
            containerRef.current.addEventListener('mouseleave', onMouseLeave);
        }
    }, [projectsList])

    return (
        <aside className={styles.gallery} ref={containerRef}>
            {projectsList.map(({ id, title, cover, client, agency }, index) => (
                <div className={styles.project__wrapper} key={index}>
                    <Link href={`/project/${id}`} className={styles.project}>
                        <Image
                            className={styles.project__image}
                            src={prismicH.asImageSrc(cover, { lossless: true, q: 100 }) || ''}
                            alt="Project Images"
                            width={2400}
                            height={1350}
                            loading="lazy"
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
