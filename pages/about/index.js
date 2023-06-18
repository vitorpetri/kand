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

    useEffect(() => {
        const tl = GSAP.timeline({ paused: true });

        const riveElement = document.querySelector(`.${styles.rive}`)
        const cover = document.querySelector(`.${styles.cover}`);
        const coverOuter = document.querySelector(`.${styles.cover_outer}`)
        const links = document.querySelectorAll(`.${styles.button}`);

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
            duration: 0.5,
            backgroundColor: "unset",
            ease: "power2.out",
        }, "shrinkRive");

        tl.fromTo(cover, {
            backgroundColor: "black",
            position: 'absolute',
        }, {
            backgroundColor: "unset",
            duration: 3.2,
            ease: "power2.out",
        }, "shrinkRive+=0.5")

        tl.to(coverOuter, {
            bottom: "200rem",
            duration: 0.9,
        }, "shrinkRive-=0.2")

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

                    <Image className={styles.bottom__icon} src={DuoSvg} alt="World" />

                    <p className={styles.bottom__code}>
                        Code by
                        <a href='https://twitter.com/whizzbbig' target='blank'>Ojas</a>
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
