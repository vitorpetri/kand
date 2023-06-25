import styles from './styles.module.sass'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useCallback, useState } from 'react'
import GSAP from 'gsap'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import Page from '../../components/Page'
import Gallery from '../../components/Gallery/index'
import SeparatorLine from '../../components/SeparatorLine'

export default function Home({ projectsList }) {
    const router = useRouter()

    const titleRef = useRef(null)
    const galleryRef = useRef(null)
    const elementRef = useRef(null)

    const [isAnimating, setIsAnimating] = useState(false);

    const handleMouseEnter = useCallback(() => {
        const title = titleRef.current;
        const gallery = galleryRef.current;

        const tl = GSAP.timeline({ paused: true, onStart: () => setIsAnimating(true), onComplete: () => setIsAnimating(false) });

        tl.to(title, { autoAlpha: 0, duration: 0.9, ease: 'power3.easeOut' });
        tl.to(gallery, { translateY: '-28rem', marginBottom: '-28rem', duration: 0.9, ease: 'power3.easeOut' }, '<0.1');

        tl.play();
    }, []);

    const handleMouseLeave = useCallback(() => {
        const title = titleRef.current;
        const gallery = galleryRef.current;

        const tl = GSAP.timeline({ paused: true, onStart: () => setIsAnimating(true), onComplete: () => setIsAnimating(false) });

        tl.to(gallery, { translateY: '0', marginBottom: '0', duration: 0.7, ease: 'power2.out' });
        tl.to(title, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, '<0.1');

        tl.play();
    }, []);

    const conditionalStyle = isAnimating ? { pointerEvents: 'none' } : { pointerEvents: 'auto' };

    return (
        <Page
            className={"Page"}
            ref={elementRef}
        >
            <Head>
                <title>KAND | All projects </title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.header} style={conditionalStyle} ref={titleRef}>
                    <h1 className={styles.title}>All Projects</h1>
                    <div className={styles.line} />
                    <SeparatorLine />
                </div>
                <div ref={galleryRef} className={styles.gallery}>
                    <Gallery projectsList={projectsList} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                </div>
                <SeparatorLine />
                <span className={styles.footer__label}>or choose by</span>
                <Link
                    href={'/categories'}
                    className={styles.footer__title}
                >Categories</Link>
            </div>
        </Page>
    )
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })
    const projects = await client.getAllByType('project')

    const projectsListTreated = projects.map((project) => {
        if (!project.data) return null
        return {
            id: project.uid,
            title: project.data.title,
            content: project.data.content,
            cover: project.data.cover,
            client: project.data.client,
            agency: project.data.agency,
        }
    })

    const orderReq = await client.getByType('order')
    const order = orderReq.results[0].data.list_order.map((item) => item.project).map((item) => item.uid)

    let projectsList = []

    order.forEach((item) => {
        const found = projectsListTreated.find((acc) => acc?.id === item)
        if (found) projectsList.push(found)
    })

    const filteredOrder = order.filter((item) => item !== undefined)

    return {
        props: { projectsList, order: filteredOrder }
    }
}
