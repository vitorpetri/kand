import styles from './styles.module.sass'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import GSAP from 'gsap';
import Rive from 'rive-react'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import * as prismicH from '@prismicio/helpers'

import Crew from '../../components/Crew'

const KandRive = '/kand.riv'


export default function Projects({ project, previousProject, nextProject }) {
    const router = useRouter();
    const riveRef = useRef(null);
    const afterRiveDiv = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [hideElements, setHideElements] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setIsLoading(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const tl = GSAP.timeline({
            paused: true,
            onComplete: () => {
                if (isLoading) {
                    router.push(`/project/${nextProject.uid}`);
                } else {
                    router.push(`/project/${previousProject.uid}`);
                }
            }
        });

        if (isLoading) {
            tl.to(riveRef.current, {
                duration: .6,
                height: '100rem',
                width: '100rem',
                translateY: "-65%",
                position: 'absolute',
                zIndex: 999,
                onStart: () => setHideElements(true),
                onComplete: () => setHideElements(false)
            })
                .to(afterRiveDiv.current, {
                    duration: 2,
                    height: '100vh',
                    transform: "translateY(-110%)",
                    ease: "power2.inOut",
                    zIndex: 9999,
                }).play();
        } else {
            GSAP.killTweensOf(riveRef.current);
            GSAP.set(riveRef.current, { clearProps: "all" });
            GSAP.set(afterRiveDiv.current, { clearProps: "all" });
            GSAP.set('.content', { clearProps: "opacity" });
        }

        return () => {
            GSAP.killTweensOf(riveRef.current);
            GSAP.set(riveRef.current, { clearProps: "all" });
            tl.kill();
        };
    }, [isLoading]);


    return (
        <div className={styles.wrapper}>
            <div className={`${styles.header} ${hideElements ? styles.hide : ''}`}>
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
                        <p className={`description ${hideElements ? styles.hide : ''}`} key={index}>{content.description}</p>
                    )
                } else if (content.video.embed_url) {
                    return (
                        <div key={index} className={`image-${content.size} video ${hideElements ? styles.hide : ''}`} scroll='true' overflow-scroll='true' >
                            <iframe
                                src={content.video.embed_url}
                                className='frame'
                                dat-tap-disabled='true'
                                allow='autoplay; fullscreen; picture-in-picture'
                                // height='101rem'
                            />
                        </div>
                    )
                } else if (content.image) {
                    return (
                        <div key={index} className={`image-${content.size} images ${hideElements ? styles.hide : ''}`}>
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
                    <ul className={`${styles.numbers} ${hideElements ? styles.hide : ''}`}>
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

            <div className={`${styles.banner} ${hideElements ? styles.hide : ''}`}>
                <div className={styles.banner__title}>{project.banner_title}</div>
                <div className={styles.banner__description}>{project.banner_description}</div>
            </div>

            <div className={`${styles.info} ${hideElements ? styles.hide : ''}`}>
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

            <div className={`${styles.footer} ${hideElements ? styles.footer__hide : ''}`}>
                <Link className={`${styles.footer__button} ${hideElements ? styles.hide : ''}`} href={`/project/${previousProject.uid}`} passHref>
                    <span
                        role='button'
                        tabIndex={0}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLoading(true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setIsLoading(true);
                            }
                        }}
                    >
                        Previous
                    </span>
                </Link>


                <div ref={riveRef} className={styles.footer__icon}>
                    <Rive src={KandRive} artboard='Rive Atomo' />
                </div>

                <div ref={afterRiveDiv} className={styles.iconAfter}></div>

                <Link className={`${styles.footer__button} ${hideElements ? styles.hide : ''}`} href={`/project/${nextProject.uid}`} passHref>
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLoading(true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setIsLoading(true);
                            }
                        }}c
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

    console.log('Next project:', nextProject);
    console.log('Previous project:', previousProject);

    return {
        props: {
            project,
            previousProject,
            nextProject
        }
    }
}
