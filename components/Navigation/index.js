import styles from './styles.module.sass'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import GSAP from 'gsap'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

export default function Navigation({ navigationData }) {
    const [isActive, setIsActive] = useState(false)

    const onClick = () => setIsActive(!isActive)
    const onHomeClick = () => setIsActive(false)

    const menuRef = useRef(null)
    const menuDivRef = useRef(null)
    const menuContentRef = useRef(null)
    const navigationRef = useRef(null)
    const svgRef = useRef(null)
    const btnRef = useRef(null)
    const logoRef = useRef(null)

    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const paint = GSAP.timeline()

            if (router.pathname === '/contact') {
                setTimeout(() => {
                    paint.to(logoRef.current, { duration: 0, borderRight: '1px solid #0B0B0B', ease: 'Expo.easeInOut' })
                    paint.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid #0B0B0B', ease: 'Expo.easeInOut' })
                    paint.to(svgRef.current, { duration: 0, color: '#0B0B0B', ease: 'Expo.easeInOut' })
                    paint.to(navigationRef.current, { duration: 0, background: '#B3FC03', ease: 'Expo.easeInOut' })
                    paint.to(btnRef.current, { duration: 0, background: '#0B0B0B', color: '#B3FC03', ease: 'Expo.easeInOut' })
                }, 500)
            } else {
                setTimeout(() => {
                    paint.to(logoRef.current, { duration: 0, borderRight: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Expo.easeInOut' })
                    paint.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Expo.easeInOut' })
                    paint.to(svgRef.current, { duration: 0, color: '#B3FC03', ease: 'Expo.easeInOut' })
                    paint.to(navigationRef.current, { duration: 0, background: '#0B0B0B', ease: 'Expo.easeInOut' })
                    paint.to(btnRef.current, { duration: 0, background: '#B3FC03', color: '#0B0B0B', ease: 'Expo.easeInOut' })
                }, 500)
            }
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tl = GSAP.timeline({ paused: true })
            const tlReverse = GSAP.timeline({ paused: true })

            tl.to(menuRef.current, { duration: 0.6, opacity: 1, scale: 1, transformOrigin: '98% 2%', display: 'block', ease: 'Expo.easeInOut' })
            tl.to(logoRef.current, { duration: 0, borderRight: '1px solid #0B0B0B', ease: 'Expo.easeInOut' })
            tl.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid #0B0B0B', ease: 'Expo.easeInOut' })
            tl.to(svgRef.current, { duration: 0, color: '#0B0B0B', ease: 'Expo.easeInOut' })
            tl.to(navigationRef.current, { duration: 0, background: '#B3FC03', ease: 'Expo.easeInOut' })
            tl.to(btnRef.current, { duration: 0, innerHTML: '-', ease: 'Expo.easeInOut' })
            tl.to(btnRef.current, { duration: 0, background: '#0B0B0B', color: '#B3FC03', ease: 'Expo.easeInOut' })
            tl.to(menuContentRef.current, { duration: 0.4, opacity: 1, ease: 'Expo.easeInOut' })

            tlReverse.to(btnRef.current, { duration: 0, innerHTML: '+', ease: 'Expo.easeInOut' })
            tlReverse.to(menuContentRef.current, { duration: 0.3, opacity: 0, ease: 'Expo.easeInOut' })
            tlReverse.to(svgRef.current, { duration: 0, color: '#B3FC03', ease: 'Expo.easeInOut' })
            tlReverse.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Expo.easeInOut' })
            tlReverse.to(navigationRef.current, { duration: 0, background: '#0B0B0B', ease: 'Expo.easeInOut' })
            tlReverse.to(logoRef.current, { duration: 0, borderRight: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Expo.easeInOut' })
            tlReverse.to(btnRef.current, { duration: 0, background: '#B3FC03', color: '#0B0B0B', ease: 'Expo.easeInOut' })
            tlReverse.to(menuRef.current, { duration: 0.7, opacity: 0, scale: 0, display: 'none', ease: 'Expo.easeInOut' })

            if (router.pathname === '/contact') {
                tl.to(navigationRef.current, { duration: 0, background: '#B3FC03' })
            }

            if (isActive) {
                tl.play()
            } else {
                tlReverse.play()
            }
        }
    })

    return (
        <>
            <div className={styles.navigation} ref={navigationRef}>
                <Link className={styles.logo__wrapper} ref={logoRef} onClick={onHomeClick} href={'/'}>
                    <div className={styles.logo} ref={svgRef}>
                        <svg className={styles.line__graphic} viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M556,182.1c0,75.7-111.9,137.1-250,137.1 M556,182.1C556,106.4,444.1,45,306,45 M556,182.1H56 M306,319.1
                c-138.1,0-250-61.4-250-137.1 M306,319.1V45 M306,319.1c67.1,0,111-61.4,111-137.1c0-75.6-43.9-137-111-137 M306,319.1
                c-67.1,0-111-61.4-111-137.1c0-75.6,43.9-137,111-137 M306,319.1c67.1,0,192.7-61.4,192.7-137.1c0-75.6-125.6-137-192.7-137
                M306,319.1c-67.1,0-188.6-61.4-188.6-137.1c0-75.6,121.5-137,188.6-137 M306,319.1c25.1,0,45.4-61.4,45.4-137.1
                c0-75.6-20.3-137-45.4-137 M306,319.1c-25.1,0-45.4-61.4-45.4-137.1c0-75.6,20.3-137,45.4-137 M56,182.1C56,106.4,167.9,45,306,45"
                                fill="none"
                                opacity="1"
                                stroke="currentColor"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </Link>
                <div className={styles.menu} ref={menuDivRef} onClick={onClick}><button className={styles.icon} ref={btnRef}>+</button></div>
            </div>

            <div className={styles.menu__wrapper} ref={menuRef}>
                <div className={styles.menu__content} ref={menuContentRef}>
                    <svg className={styles.olho} viewBox="0 0 650 350" xmlns="http://www.w3.org/2000/svg">
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
                    </svg>
                    <div className={styles.text__box}>
                        <div className={styles.menu__text}>{navigationData.title}</div>
                        <div className={styles.line} />
                    </div>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__item} onClick={onClick}><Link href={'/projects'}>{navigationData.work_title}</Link></li>
                        <li className={styles.menu__item} onClick={onClick}><Link href={'/about'}>{navigationData.about_title}</Link></li>
                        <li className={styles.menu__item} onClick={onClick}><Link href={'/contact'}>{navigationData.contact_title}</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
