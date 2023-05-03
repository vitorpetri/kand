import styles from './styles.module.sass'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import GSAP from 'gsap'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import Gallery from '../../components/Gallery'
import SeparatorLine from '../../components/SeparatorLine'

export default function Categories({ projectsList, allTags, selectedTagIndex }) {
    const router = useRouter()

    const titleRef = useRef(null)
    const galleryRef = useRef(null)

    useEffect(() => {
        const title = titleRef.current
        const gallery = galleryRef.current

        const tl = GSAP.timeline()

        tl.to(title, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 2)
        tl.to(gallery, { translateY: '-20rem', marginBottom: '-20rem', duration: 0.8, ease: 'power2.out' }, 2)
    }, [])

    // const [activeCategories, setActiveCategories] = useState([]);

    const [activeCategory, setActiveCategory] = useState(selectedTagIndex);

    // const toggleActive = (index) => {
    //     if (activeCategories.includes(index)) {
    //         // Remove the index from activeCategories if it's already there
    //         setActiveCategories(activeCategories.filter((item) => item !== index));
    //     } else {
    //         // Add the index to activeCategories if it's not there
    //         setActiveCategories([...activeCategories, index]);
    //     }
    // };

    const toggleActive = (index) => {
        setActiveCategory(index === activeCategory ? null : index);
    };

    const filteredProjects = () => {
        // If no categories are selected, show all projects
        // if (activeCategory.length === 0) {
        //     return projectsList;
        // }
        if (activeCategory === null) {
            return projectsList;
        }

        // Filter projects based on the selected categories
        return projectsList.filter((project) =>
            // activeCategories.every((index) => project.tags.includes(allTags[index]))
            project.tags.includes(allTags[activeCategory])
        );
    };

    return (
        <>
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
        </>
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

    return {
        props: { projectsList, order, allTags, selectedTagIndex }
    }
}
