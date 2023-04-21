import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery'
import SeparatorLine from '@/components/SeparatorLine'
import Line from '@/components/Line'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

export default function Categories({ projectsList, allTags }) {

    const [activeCategories, setActiveCategories] = useState([]);

    const toggleActive = (index) => {
        if (activeCategories.includes(index)) {
            // Remove the index from activeCategories if it's already there
            setActiveCategories(activeCategories.filter((item) => item !== index));
        } else {
            // Add the index to activeCategories if it's not there
            setActiveCategories([...activeCategories, index]);
        }
    };

    const filteredProjects = () => {
        // If no categories are selected, show all projects
        if (activeCategories.length === 0) {
            return projectsList;
        }

        // Filter projects based on the selected categories
        return projectsList.filter((project) =>
            activeCategories.every((index) => project.tags.includes(allTags[index]))
        );
    };


    return <>
        <Head>
            <title>KAND | Categories</title>
        </Head>

        <div className={styles.wrapper}>
            <h1 className={styles.title}>Categories</h1>
            <div className={styles.line}><Line /></div>

            <div className={styles.filters}>
                {allTags.map((tag, index) => (
                    <div
                        key={tag}
                        className={`${styles.category} ${activeCategories.includes(index) ? styles.active : ""
                            }`}
                        onClick={() => toggleActive(index)}
                    >
                        {tag}
                    </div>
                ))}
            </div>


            <SeparatorLine />
            <Gallery projectsList={filteredProjects()} />
            <SeparatorLine />
            <span className={styles.footer__label}>or see</span>
            <Link href={'/projects'} className={styles.footer__title}>All Projects</Link>
        </div>
    </>
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })
    const projects = await client.getAllByType('project')

    // Fetch all documents with their tags
    const allDocumentsResponse = await client.query('', { pageSize: 100 });

    // Extract all tags and remove duplicates
    const allTags = [
        ...new Set(allDocumentsResponse.results.flatMap((doc) => doc.tags)),
    ];

    const projectsListTreated = projects.map((project) => {
        if (!project.data) return null
        return {
            id: project.uid,
            title: project.data.title,
            content: project.data.content,
            cover: project.data.cover,
            tags: project.tags,
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
        props: { projectsList, order, allTags }
    }
}
