import styles from './styles.module.sass'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import GSAP from 'gsap'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import Page from '../../components/Page'
import Gallery from '../../components/Gallery'
import SeparatorLine from '../../components/SeparatorLine'

export default function Categories({ projectsList, allTags, selectedTagIndex, navigation }) {
    const router = useRouter()
    const titleRef = useRef(null)
    const galleryRef = useRef(null)
    const elementRef = useRef(null)

    const [activeCategory, setActiveCategory] = useState(selectedTagIndex);
    const [showProjects, setShowProjects] = useState(false);

    useEffect(() => {
        const title = titleRef.current
        const gallery = galleryRef.current

        const tl = GSAP.timeline()

        tl.to(title, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 2)
        tl.to(gallery, { translateY: '-20rem', marginBottom: '-20rem', duration: 0.8, ease: 'power2.out' }, 2)
    }, [])

    const toggleActive = (index) => {
        if (activeCategory === index) {
            setShowProjects(false);
        } else {
            setShowProjects(true);
        }

        setActiveCategory(index === activeCategory ? null : index);
    };

    const filteredProjects = () => {
        if (!showProjects) {
            return [];
        }

        if (activeCategory === null) {
            return projectsList;
        }

        return projectsList.filter((project) =>
            project.tags.includes(allTags[activeCategory])
        );
    };

    return (
        <Page
            className={"Page"}
            ref={elementRef}
            navigation={navigation}
        >
            <Head>
                <title>KAND | Categories</title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.header} ref={titleRef}>
                    <h1 className={styles.title}>Categories</h1>
                    <div className={styles.line} />
                </div>

                <div ref={galleryRef} className={styles.gallery}>
                    <div className={styles.filters}>
                        {allTags.map((tag, index) => (
                            // <div
                            //     key={tag}
                            //     className={`${styles.category} ${activeCategories.includes(index) ? styles.active : ""
                            //         }`}
                            //     onClick={() => toggleActive(index)}
                            // >
                            //     {tag}
                            // </div>
                            <div
                                key={tag}
                                className={`${styles.category} ${activeCategory === index ? styles.active : ""
                                    }`}
                                onClick={() => toggleActive(index)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>

                    <SeparatorLine />
                    <Gallery projectsList={filteredProjects()} />
                </div>

                <SeparatorLine />
                <span className={styles.footer__label}>or see</span>
                <Link href={'/projects'} className={styles.footer__title}>All Projects</Link>
            </div>
        </Page>
    )
}

export async function getServerSideProps(context) {
    const client = createClient({ accessToken: sm.token })
    const projects = await client.getAllByType('project')

    // Fetch all documents with their tags
    const allDocumentsResponse = await client.query('', { pageSize: 100 });

    // Extract all tags and remove duplicates
    const allTags = [
        ...new Set(allDocumentsResponse.results.flatMap((doc) => doc.tags)),
    ];

    const selectedTagName = context.query.tag;
    const selectedTagIndex = selectedTagName ? allTags.indexOf(selectedTagName) : null;

    const projectsListTreated = projects.map((project) => {
        if (!project.data) return null
        return {
            id: project.uid,
            title: project.data.title,
            content: project.data.content,
            cover: project.data.cover,
            tags: project.tags,
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

    // Fetch Navigation
    const navigation = await client.getByType('navigation')
    const navigationData = navigation?.results[0]?.data

    return {
        props: { projectsList, order: filteredOrder, allTags, selectedTagIndex, navigation: navigationData }
    }
}
