import styles from './styles.module.sass'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import * as prismicH from '@prismicio/helpers'

import Line from '../../components/Line'
import Crew from '../../components/Crew'

import AtomoSvg from '../../public/atomo.svg'

export default function Projects({ project, previousProject, nextProject }) {
    const router = useRouter();

    const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // Initialize the current project index to 0
    const projectList = [previousProject, project, nextProject]; // Create an array of projects

    const handlePreviousProject = () => {
        setCurrentProjectIndex((currentProjectIndex - 1 + projectList.length) % projectList.length); // Calculate the previous project index
    };

    const handleNextProject = () => {
        setCurrentProjectIndex((currentProjectIndex + 1) % projectList.length); // Calculate the next project index
    };

    const currentProject = projectList[currentProjectIndex]; // Get the current project from the array

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.client_label}>Client</div>
                <div className={styles.client}>{project.client}</div>

                <div className={styles.title} dangerouslySetInnerHTML={{ __html: project.title }} />

                <div className={styles.agency_label}>Agency</div>
                <div className={styles.agency}>{project.agency}</div>

                <Line />
            </div>

            {project.content.map((content, index) => {
                if (content.description) {
                    return (
                        <p className='description' key={index}>{content.description}</p>
                    )
                } else if (content.video.embed_url) {
                    return (
                        <div key={index} className='video'>
                            <iframe
                                src={content.video.embed_url}
                                className='frame'
                                allow='autoplay; fullscreen; picture-in-picture'
                            >
                            </iframe>
                        </div>
                    )
                } else if (content.image) {
                    return (
                        <div key={index} className={`image-${content.size} images`}>
                            <img
                                src={prismicH.asImageSrc(content.image, { lossless: true, q: 100 }) || ''}
                                alt={content.image.alt} />
                        </div>
                    )
                }
            })}

            {project.numbers && project.numbers.length > 0 ? (
                project.numbers
                    .filter(number => number.title && number.description).length > 0 ? (
                    <ul className={styles.numbers}>
                        {project.numbers
                            .filter(number => number.title && number.description)
                            .map((number, index) => {
                                return (
                                    <li className={styles.numbers__item} key={index}>
                                        <div className={styles.numbers__title}>{number.title}</div>
                                        <div className={styles.numbers__description}>{number.description}</div>
                                    </li>
                                )
                            })}
                    </ul>
                ) : null
            ) : null}

            <div className={styles.banner}>
                <div className={styles.banner__title}>{project.banner_title}</div>
                <div className={styles.banner__description}>{project.banner_description}</div>
            </div>

            <div className={styles.info}>
                <Crew data={project} />

                <div className={styles.categories}>
                    <div className={styles.categories__title}>Categories</div>
                    <ul className={styles.categories__list}>
                        {project.tags.map((tag) => (
                            <li key={tag} className={styles.categories__item}>
                                <Link href={`/categories?tag=${encodeURIComponent(tag)}`}>
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.footer}>
                {/* <Link className={styles.footer__button} href={`/project/${previousProject.uid}`} passHref> */}
                <Link className={styles.footer__button} href={`/project/${nextProject.uid}`} passHref>
                    <span
                        role='button'
                        tabIndex={0}
                        onClick={() => router.push(`/project/${previousProject.uid}`)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                router.push(`/project/${previousProject.uid}`);
                            }
                        }}
                    >
                        Previous
                    </span>
                </Link>
                <Image className={styles.footer__icon} src={AtomoSvg} alt="Atom" />
                <Link className={styles.footer__button} href={`/project/${nextProject.uid}`} passHref>
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={() => router.push(`/project/${nextProject.uid}`)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                router.push(`/project/${nextProject.uid}`);
                            }
                        }}
                    >
                        Next
                    </span>
                </Link>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { uid } = context.params

    const client = createClient({ accessToken: sm.token })
    const res = await client.getByUID('project', uid)

    if (!res) return { notFound: true }

    // Fetch the list of the pages
    const projectList = await client.query("", { pageSize: 100 })

    // Fetch the current project index in the list
    const currentProjectIndex = projectList.results.findIndex((p) => p.uid === uid)

    // Retrieve the previous and next projects
    const previousProject = currentProjectIndex > 0 ? projectList.results[currentProjectIndex - 1] : null
    const nextProject = currentProjectIndex < projectList.results.length - 1 ? projectList.results[currentProjectIndex + 1] : null

    const project = {
        ...res.data,
        uid: res.uid,
        tags: res.tags,
    }

    return {
        props: {
            project,
            previousProject,
            nextProject
        }
    }
}
