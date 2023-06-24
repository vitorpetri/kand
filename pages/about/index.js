import styles from './styles.module.sass'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Rive from 'rive-react'
import Image from 'next/image'
import GSAP from 'gsap'

import Page from '../../components/Page'
import Render from '../../components/Render'

const KandRive = '/kand.riv'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import SeparatorLine from '../../components/SeparatorLine'
import Description from '../../components/Description'
import Profile from '../../components/Profile'
import Clients from '../../components/Clients'
import Awards from '../../components/Awards'

import DuoSvg from '../../public/duo.svg'

export default function About({ data, navigation }) {
    const elementRef = useRef(null)
    const riveRef = useRef(null)

    const descriptionRefs = useRef([]);
    const imageRefs = useRef([]);
    const videoRefs = useRef([]);

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
        GSAP.set(descriptionRefs.current, { autoAlpha: 0, y: 30 });
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
                                duration: 1,
                                y: 0,
                                ease: 'power2',
                            });
                        } else {
                            // Only fade in for other elements
                            GSAP.to(entry.target, {
                                autoAlpha: 1,
                                duration: 1.5,
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

    useEffect(() => {
        const tl = GSAP.timeline({ paused: true });

        const riveElement = document.querySelector(`.${styles.rive}`)
        const cover = document.querySelector(`.${styles.cover}`);
        const coverOuter = document.querySelector(`.${styles.cover_outer}`)

        tl.addLabel("shrinkRive", "+=1.2");

        tl.fromTo(riveElement, {
            top: '15%',
            left: '25%',
            width: '100rem',
            height: '100rem',
        }, {
            top: '10%',
            left: '48%',
            width: '8rem',
            height: '12rem',
            duration: 0.6,
            backgroundColor: "unset",
            ease: "power3.out",
        }, "shrinkRive");

        tl.fromTo(cover, {
            position: 'absolute',
            opacity: 1
        }, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        }, "shrinkRive+=0.25")

        tl.to(coverOuter, {
            bottom: "200rem",
            visibility: "visible",
            duration: 1,
        }, "shrinkRive-=0.2")

        tl.play();
    }, []);

    return (
        <Page
            className={"Page"}
            ref={elementRef}
            shared={navigation}
            navigation={navigation}
        >
            <Head>
                <title>KAND | About</title>
            </Head>

            <div className={styles.wrapper}>
                <div ref={riveRef} className={styles.icon}>
                    <div className={styles.cover} />
                    <Rive className={styles.rive} src={KandRive} artboard='Rive Duo' />
                    <div className={styles.cover_outer} />
                </div>
                <h1 className={styles.title}>{data.title}</h1>
                <SeparatorLine />

                <Description data={data} />

                <SeparatorLine />

                <Profile data={data} />

                <SeparatorLine />

                <Clients data={data} />

                <SeparatorLine />

                <Awards data={data} />

                <SeparatorLine />

                <div className={styles.footer}>
                    <p className={styles.bottom__design}>
                        Design by
                        <strong>US</strong>
                    </p>

                    <Rive className={styles.bottom__icon} src={KandRive} artboard='Rive Duo' />

                    <p className={styles.bottom__code}>
                        Code by
                        <a href='https://read.cv/whizzbbig' target='blank'>Ojas</a>
                        <strong>&</strong>
                        <a href='https://vitorpetri.com' target='blank'>Vitor</a>
                    </p>
                </div>
            </div>
        </Page>
    )
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })

    // Fetch the navigation data separately
    const navigation = await client.getByType('navigation')
    const navigationData = navigation?.results[0]?.data

    const about = await client.getByType('about')
    const data = about?.results[0]?.data

    return {
        props: {
            data: data,
            navigation: navigationData
        },
    }
}
