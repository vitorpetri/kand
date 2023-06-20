import styles from './styles.module.sass'

import Head from 'next/head'

import Page from '../../components/Page'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import Rive from 'rive-react'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import GSAP from 'gsap'

const KandRive = '/kand.riv'

export default function Contact({ data, navigation }) {
    const elementRef = useRef(null)
    const riveRef = useRef(null)
    const paragraphRef = useRef(null)
    const name1Ref = useRef(null)
    const name2Ref = useRef(null)
    const emailRef = useRef(null)
    const social11Ref = useRef(null)
    const social12Ref = useRef(null)
    const social13Ref = useRef(null)
    const social21Ref = useRef(null)
    const social22Ref = useRef(null)
    const social23Ref = useRef(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tl = GSAP.timeline()

            tl.set(riveRef.current, {scale: 2.8, x: '50rem'})
            tl.set(name1Ref.current, {opacity: 0, x: '10rem'})
            tl.set(name2Ref.current, {opacity: 0, x: '-10rem'})
            tl.set(paragraphRef.current, {opacity: 0})
            tl.set(emailRef.current, {opacity: 0})
            
            tl.to(riveRef.current, { duration: 0.8, scale: 1, x: '0rem', ease: 'Expo.easeInOut' })
            tl.to(name1Ref.current, { duration: 0.8, opacity: 1, x: '0rem', ease: 'Expo.easeInOut' })
            tl.to(name2Ref.current, { duration: 0.8, opacity: 1, x: '0rem', ease: 'Expo.easeInOut' }, '<')
            tl.to(paragraphRef.current, { duration: 0.7, opacity: 1, ease: 'Expo.easeInOut' })
            tl.to(emailRef.current, { duration: 0.7, opacity: 1, ease: 'Expo.easeInOut' })
        }
    })
    
    return (
        <Page
            className={"Page"}
            ref={elementRef}
            navigation={navigation}
        >
            <Head>
                <title>KAND | Contact</title>
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.paragraph} ref={paragraphRef} dangerouslySetInnerHTML={{ __html: data.paragraph }} />

                <div className={styles.duo}>
                    {/* <svg className={styles.olho} viewBox="0 0 650 350" xmlns="http://www.w3.org/2000/svg">
                        <path d="M334.5,321c83.7,0,151.5-67.8,151.5-151.5S418.2,18,334.5,18 M334.5,321C250.8,321,183,253.2,183,169.5
              S250.8,18,334.5,18 M334.5,321C533,321,644,169.5,644,169.5S533,18,334.5,18 M334.5,321C136,321,25,169.5,25,169.5S136,18,334.5,18
              M334.5,245c41.7,0,75.5-33.8,75.5-75.5S376.2,94,334.5,94 M334.5,245c-41.7,0-75.5-33.8-75.5-75.5S292.8,94,334.5,94 M334.5,245
              c17.7,0,32-33.8,32-75.5S352.2,94,334.5,94 M334.5,245c-17.7,0-32-33.8-32-75.5s14.3-75.5,32-75.5"
                            fill="none"
                            opacity="1"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg> */}

                    <div ref={riveRef} className={styles.olho}>
                        <Rive src={KandRive} className={styles.olho_rive} artboard='Rive Olho' />
                    </div>

                    <div className={styles.name} ref={name1Ref}>
                        <div className={styles.accent}></div>
                        <div className={styles.title}>{data.info_1[0].name}</div>
                        <a ref={social11Ref} className={styles.link} href={data.info_1[0].social_1_link} target='blank'>{data.info_1[0].social_1}</a>
                        <a ref={social12Ref} className={styles.link} href={data.info_1[0].social_2_link} target='blank'>{data.info_1[0].social_2}</a>
                        <a ref={social13Ref} className={styles.phone} href={data.info_1[0].phone_link} target='blank'>{data.info_1[0].phone}</a>
                    </div>

                    <div className={styles.name} ref={name2Ref}>
                        <div className={styles.title}>{data.info_2[0].name}</div>
                        <a ref={social21Ref} className={styles.link} href={data.info_2[0].social_1_link} target='blank'>{data.info_2[0].social_1}</a>
                        <a ref={social22Ref} className={styles.link} href={data.info_2[0].social_2_link} target='blank'>{data.info_2[0].social_2}</a>
                        <a ref={social23Ref} className={styles.phone} href={data.info_2[0].phone_link} target='blank'>{data.info_2[0].phone}</a>
                    </div>
                </div>

                <a className={styles.email} href="mailto:kaueanddaltro@gmail.com" ref={emailRef}>{data.email}</a>
            </div>
        </Page>
    )
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })

    const contact = await client.getByType('contact')
    const data = contact?.results[0]?.data

    // FETCH NAVIGATION
    const navigation = await client.getByType('navigation')
    const navigationData = navigation?.results[0]?.data

    return {
        props: { data: data, navigation: navigationData },
    }
}
