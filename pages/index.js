import Head from 'next/head'
import MundoSvg from '../public/mundo.svg'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Rive from 'rive-react'
import GSAP from 'gsap'

import { createClient } from '../prismicio'
import sm from '../sm.json'

import Page from '../components/Page'

import styles from './styles.module.sass'

const KandRive = '/kand.riv'

export default function Home({ data }) {
    const elementRef = useRef(null)
    const riveRef = useRef(null)

    useEffect(() => {
        const tl = GSAP.timeline({ paused: true });

        const riveElement = riveRef.current;
        const cover = document.querySelector(`.${styles.cover}`);
        const lines = riveElement.querySelectorAll(`.${styles.line}`);
        const firstName = document.querySelector(`.${styles.firstName}`);
        const secondName = document.querySelector(`.${styles.secondName}`);
        const otherElements = document.querySelectorAll(`.${styles.paragraph}, .${styles.buttons__wrapper}`);
        const links = document.querySelectorAll(`.${styles.button}`);
        const PageElement = document.querySelector('.Page')

        tl.addLabel("shrinkRive", "+=1.2");

        tl.fromTo(riveElement, {
            scale: 1.8,
            backgroundColor: 'black',
        }, {
            scale: 1,
            duration: 0.5,
            backgroundColor: "unset",
            ease: "power2.out",
        }, "shrinkRive");

        tl.fromTo(cover, {
            backgroundColor: "black",
        }, {
            backgroundColor: "unset",
            duration: .5,
            ease: "power2.out",
        }, "shrinkRive+=0.5")

        tl.fromTo(PageElement, {
            backgroundColor: 'black',
        }, {
            backgroundColor: 'unset',
            duration: 3,
            ease: "power2.inOut"
        }, "shrinkRive+=0.5");

        tl.to(lines, {
            width: "1.8rem",
            duration: 0.5,
            autoAlpha: 1,
        }, "shrinkRive-=0.4");

        tl.to(lines[0], {
            left: "48%",
            duration: 0.5,
            ease: "power2.out",
        }, "shrinkRive-=0.2");

        tl.to(lines[1], {
            right: "47.6%",
            duration: 0.5,
            ease: "power2.out",
        }, "shrinkRive-=0.2");

        tl.fromTo([firstName, secondName], {
            opacity: 0,
            autoAlpha: 0,
        }, {
            opacity: 1,
            translateX: '0',
            duration: 1.8,
            autoAlpha: 1,
            ease: "Expo.easeInOut",
            visibility: 'visible',
        }, "shrinkRive-=0.9");

        tl.fromTo(otherElements, {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.2, // 0.2 second delay between each element animation
        }, "shrinkRive+=1");

        tl.play();

        // Reverse the animation when leaving the page
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');

                tl.eventCallback("onReverseComplete", () => {
                    window.location.href = target;
                });

                tl.reverse();
            });
        });

    }, []);

    return (
        <Page
            className={"Page"}
            ref={elementRef}
        >
            <Head>
                <title>KAUÊ & DALTRO</title>
            </Head>

            <div className={styles.wrapper}  >
                <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: data.first_paragraph }} />
                <div className={styles.title}>
                    <div className={styles.firstName}>
                        <div className={styles.accent}></div>
                        <h1 className={styles.name}>{data.first_name}</h1>
                    </div>

                    <div ref={riveRef} className={styles.icon}>
                        <div className={styles.line} />
                        <Rive className={styles.rive} src={KandRive} artboard='Rive Mundo' />
                        <div className={styles.cover} />
                        <div className={styles.line} />
                    </div>

                    <h1 className={styles.secondName}>{data.second_name}</h1>
                </div>
                <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: data.second_paragraph }} />
                <p className={styles.paragraph}>
                    {data.question}
                </p>
                <div className={styles.buttons__wrapper}>
                    <Link href={"/projects"} className={styles.button}>
                        {data.first_button}
                    </Link>
                    <Link href={"/categories"} className={styles.button}>
                        {data.second_button}
                    </Link>
                </div>
            </div>
        </Page>
    )
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })

    const home = await client.getByType('home')
    const data = home?.results[0]?.data

    return {
        props: { data: data },
    }
}