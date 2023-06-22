import styles from './styles.module.sass'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import Rive from 'rive-react'
import Image from 'next/image';
import GSAP from 'gsap'
import Lenis from '../../utils/scroll'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'
import * as prismicH from '@prismicio/helpers'

import Page from '../../components/Page'
import Crew from '../../components/Crew'

const KandRive = '/kand.riv'

export default function Projects({ project, previousProject, nextProject, navigationData, currentProjectIndex, projectListLength }) {
    const router = useRouter()
    const riveRef = useRef(null)
    const tl = useRef(null);
    const elementRef = useRef(null)
    const [nextUrl, setNextUrl] = useState(null)
    const descriptionRefs = useRef([]);
    const imageRefs = useRef([]);
    const videoRefs = useRef([]);

    const frameRef = useRef(null)

    const handleNavigation = (url) => {
        setNextUrl(url);
        if (tl.current) {
            tl.current.restart();
        }
    };

    useEffect(() => {
        const forceRepaint = () => {
            document.body.offsetHeight;
        };
        forceRepaint();
    }, [])

    useEffect(() => {
        tl.current = GSAP.timeline({
            paused: true,
            onComplete: () => {
                if (nextUrl) {
                    router.push(nextUrl);
                }
            }
        });

        const riveElement = document.querySelector(`.${styles.rive}`);
        const cover = document.querySelector(`.${styles.cover}`);
        const coverOuter = document.querySelector(`.${styles.cover_outer}`);

        tl.current.addLabel("shrinkRive", "+=1.2");

        tl.current.to(riveElement, {
            autoAlpha: 1,
        }, "shrinkRive-=0.2")

        tl.current.to(cover, {
            autoAlpha: 1,
        }, "shrinkRive-=0.2")

        tl.current.to(riveElement, {
            top: '30rem',
            left: '60rem',
            width: '70rem',
            height: '70rem',
            duration: 0.6,
            ease: "power3.out",
        }, "shrinkRive");

        tl.current.to(cover, {
            visibility: 'visible',
            duration: 1.2,
            ease: "power2.out",
        }, "shrinkRive-=0.5");

        tl.current.to(riveElement, {
            autoAlpha: 0,
        }, "shrinkRive+=.55")

        // tl.current.to(riveElement, {
        //     top: '0',
        //     left: '0',
        //     width: '20rem',
        //     height: '20rem',
        //     duration: 0.6,
        //     ease: "power3.out",
        // }, "shrinkRive+=.7");
    }, []);

    const addDescriptionRef = (el) => {
        if (el && !descriptionRefs.current.includes(el)) {
            descriptionRefs.current.push(el);
        }
    };

    const addImageRef = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    const addVideoRef = (el) => {
        if (el && !videoRefs.current.includes(el)) {
            videoRefs.current.push(el);
        }
    };

    useEffect(() => {
        GSAP.set(descriptionRefs.current, { autoAlpha: 0, y: 100 });
        GSAP.set(imageRefs.current, { autoAlpha: 0 });
        GSAP.set(videoRefs.current, { autoAlpha: 0 });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Check if the target is one of the elements in descriptionRefs
                        if (descriptionRefs.current.includes(entry.target)) {
                            // Animate the element using GSAP
                            GSAP.to(entry.target, {
                                autoAlpha: 1,
                                duration: 2,
                                y: 0,
                                ease: 'power2',
                            });
                        } else {
                            // Only fade in for other elements
                            GSAP.to(entry.target, {
                                autoAlpha: 1,
                                duration: 2,
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
        );

        // Observing elements in descriptionRefs, imageRefs, and videoRefs
        descriptionRefs.current.forEach((element) => observer.observe(element));
        imageRefs.current.forEach((element) => observer.observe(element));
        videoRefs.current.forEach((element) => observer.observe(element));

        return () => {
            // Cleanup - stop observing all targets
            descriptionRefs.current.forEach((element) => observer.unobserve(element));
            imageRefs.current.forEach((element) => observer.unobserve(element));
            videoRefs.current.forEach((element) => observer.unobserve(element));
        };
    }, []);


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
                            <p ref={addDescriptionRef} className={`${content.size} ${styles.description} description`} key={index} dangerouslySetInnerHTML={{ __html: content.description }} />
                        )
                    } else if (content.video.embed_url) {
                        return (
                            <div ref={addVideoRef} key={index} className={`media-${content.size} ${styles.video} video`} scroll='true' overflow-scroll='true' >
                                <iframe
                                    src={content.video.embed_url}
                                    ref={frameRef}
                                    className='frame'
                                    dat-tap-disabled='true'
                                    allow='autoplay; fullscreen; picture-in-picture'
                                />
                            </div>
                        )
                    } else if (content.image) {
                        const { width, height } = content.image;
                        return (
                            <figure ref={addImageRef} key={index} className={`media-${content.size} ${styles.image} image`}>
                                <img src={prismicH.asImageSrc(content.image, { lossless: true, q: 100 }) || ''} />
                            </figure>
                        )
                    }
                })}

                {project.numbers && project.numbers.length > 0 ? (
                    project.numbers
                        .filter(number => number.title && number.description).length > 0 ? (
                        <ul ref={addDescriptionRef} className={styles.numbers}>
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
                        <ul ref={addDescriptionRef} className={styles.categories__list}>
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
                    <Link
                        className={`${styles.footer__button} ${currentProjectIndex === 0 ? 'hidden disabled' : ''}`}
                        href={`/project/${previousProject.uid}`}
                        passHref>
                        <span
                            role='button'
                            tabIndex={0}
                            onClick={() => handleNavigation(`/project/${previousProject.uid}`)}
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

                    <div className={styles.cover}></div>
                    <Rive className={styles.rive} src={KandRive} artboard='Rive Atomo' />

                    <Link
                        className={`${styles.footer__button} ${currentProjectIndex === projectListLength - 1 ? 'hidden disabled' : ''}`}
                        href={`/project/${nextProject.uid}`}
                        passHref>
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={() => handleNavigation(`/project/${nextProject.uid}`)}
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

    project.content.forEach((content, index) => {
        if (content.image) {
            const dimensions = content.image.dimensions;
            if (dimensions) {
                content.image.width = dimensions.width;
                content.image.height = dimensions.height;
            }
        }
    });

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
            currentProjectIndex,
            projectListLength: projectList.length,
        }
    }
}
