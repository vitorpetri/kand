import styles from './styles.module.sass'

import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import GSAP from 'gsap';
import Rive from 'rive-react'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import * as prismicH from '@prismicio/helpers'

import Page from '../../components/Page'
import Crew from '../../components/Crew'

const KandRive = '/kand.riv'


export default function Projects({ project, previousProject, nextProject, navigationData }) {
    const router = useRouter();
    const riveRef = useRef(null);
    const elementRef = useRef(null)

    return (
        <Page
            className={"Page"}
            ref={elementRef}
            navigation={navigationData}
        >
            <Head>
                <title>KAND | {project.title.replace(/<br\s*\/?>/gi, '')}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.client_label}>Client</div>
                    <div className={styles.client}>{project.client}</div>

                    <div className={styles.title} dangerouslySetInnerHTML={{ __html: project.title }} />

                    <div className={styles.agency_label}>Agency</div>
                    <div className={styles.agency}>{project.agency}</div>

                    <div className={styles.line} />
                </div>

                {project.content.map((content, index) => {
                    if (content.description) {
                        return (
                            <p className='description' key={index}>{content.description}</p>
                        )
                    } else if (content.video.embed_url) {
                        return (
                            <div key={index} className={`media-${content.size} video`} scroll='true' overflow-scroll='true' >
                                <iframe
                                    src={content.video.embed_url}
                                    // className={`image-${content.size} frame`}
                                    className='frame'
                                    dat-tap-disabled='true'
                                    allow='autoplay; fullscreen; picture-in-picture'
                                />
                            </div>
                        )
                    } else if (content.image) {
                        return (
                            <div key={index} className={`media-${content.size} images`}>
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
                    <Link className={styles.footer__button} href={`/project/${previousProject.uid}`} passHref>
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


                    <div ref={riveRef} className={styles.footer__icon}>
                        <Rive src={KandRive} artboard='Rive Atomo' />
                    </div>

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
        </Page>
    )
}

export async function getServerSideProps(context) {
    const { uid } = context.params

    const client = createClient({ accessToken: sm.token })
    const res = await client.getByUID('project', uid)

    if (!res) return { notFound: true }

    // Fetch the Projects List
    const projects = await client.getSingle('order')

    const projectList = projects.data.list_order.map(item => item.project)

    // Fetch the current project index in the list
    const currentProjectIndex = projectList.findIndex((p) => p.uid === uid)

    // Retrieve the previous and next projects with looping
    const previousProject = currentProjectIndex > 0 ? projectList[currentProjectIndex - 1] : projectList[projectList.length - 1];
    const nextProject = currentProjectIndex < projectList.length - 1 ? projectList[currentProjectIndex + 1] : projectList[0];

    const project = {
        ...res.data,
        uid: res.uid,
        tags: res.tags,
    }

    // console.log('Next project:', nextProject);
    // console.log('Previous project:', previousProject);

    // FETCH NAVIGATION
    const navigation = await client.getByType('navigation')
    const navigationData = navigation?.results[0]?.data

    return {
        props: {
            project,
            previousProject,
            nextProject,
            navigationData,
        }
    }
}
