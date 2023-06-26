import styles from './styles.module.sass'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect, useCallback } from 'react'
import GSAP from 'gsap'
import Rive from 'rive-react'
import Lenis from '../../utils/scroll'

const KandRive = '/kand.riv'

export default function Navigation({ navigationData }) {
    const [logoColor, setLogoColor] = useState('original')

    const [isActive, setIsActive] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        function handleRiveLoad(event) {
            setRiveLogoInstance(event)
        }

        const riveElement = document.querySelector(`.${styles.logo}`)
        if (riveElement) {
            riveElement.addEventListener("load", handleRiveLoad)
        }

        return () => {
            if (riveElement) {
                riveElement.removeEventListener("load", handleRiveLoad)
            }
        };
    }, []);

    const riveRef = useRef(null)
    const riveAtomoRef = useRef(null)
    const riveDuoRef = useRef(null)
    const riveRefMobile = useRef(null)
    const menuRef = useRef(null)
    const menuDivRef = useRef(null)
    const menuTextRef = useRef(null)
    const menuItem1Ref = useRef(null)
    const menuItem2Ref = useRef(null)
    const menuItem3Ref = useRef(null)
    const navigationRef = useRef(null)
    const svgRef = useRef(null)
    const btnRef = useRef(null)
    const logoRef = useRef(null)
    const btnPlus = useRef(null)

    const router = useRouter()

    const delayedNavigate = useCallback((route) => {
        const tl = GSAP.timeline();
        tl.to({}, { duration: 1.8, onComplete: () => router.push(route) });
    }, [router]);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const executePaint = () => {
    //             const paint = GSAP.timeline();

    //             if (
    //                 logoRef.current &&
    //                 menuDivRef.current &&
    //                 svgRef.current &&
    //                 navigationRef.current &&
    //                 btnRef.current
    //             ) {
    //                 if (router.pathname === '/contact') {
    //                     setLogoColor('black')

    //                     paint.to(logoRef.current, { duration: 0, borderRight: '1px solid #101010', ease: 'Power4.easeInOut' });
    //                     paint.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid #101010', ease: 'Power4.easeInOut' });
    //                     paint.to(svgRef.current, { duration: 0, color: '#101010', ease: 'Power4.easeInOut' });
    //                     paint.to(navigationRef.current, { duration: 0, background: '#B3FC03', ease: 'Power4.easeInOut' });
    //                     paint.to(btnRef.current, { duration: 0, background: '#101010', color: '#B3FC03', ease: 'Power4.easeInOut' });
    //                 } else {
    //                     setLogoColor('original')
    //                     paint.to(logoRef.current, { duration: 0, borderRight: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Power4.easeInOut' });
    //                     paint.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Power4.easeInOut' });
    //                     paint.to(svgRef.current, { duration: 0, color: '#B3FC03', ease: 'Power4.easeInOut' });
    //                     paint.to(navigationRef.current, { duration: 0, background: '#101010', ease: 'Power4.easeInOut' });
    //                     paint.to(btnRef.current, { duration: 0, background: '#B3FC03', color: '#101010', ease: 'Power4.easeInOut' });
    //                 }
    //             }
    //         };
    //         setTimeout(executePaint, 500);
    //     }
    // });

    useEffect(() => {
        if (typeof window !== 'undefined' &&
            menuRef.current &&
            logoRef.current &&
            menuDivRef.current &&
            svgRef.current &&
            navigationRef.current &&
            btnPlus.current &&
            riveRef.current &&
            riveRefMobile.current &&
            menuTextRef.current &&
            menuItem1Ref.current &&
            menuItem2Ref.current &&
            menuItem3Ref.current
        ) {
            const tl = GSAP.timeline({ paused: true, onStart: () => setIsAnimating(true), onComplete: () => setIsAnimating(false) });
            const tlReverse = GSAP.timeline({ paused: true, onStart: () => setIsAnimating(true), onComplete: () => setIsAnimating(false) });

            // const animationCompleted = () => {
            //     setIsAnimating(false)
            //     setLogoColor(logoColor === 'original' ? 'black' : 'original')
            // }

            tl.set(riveRef.current, { opacity: '1', display: 'flex' })
            tl.set(riveDuoRef.current, { opacity: '0', display: 'none' }, '<')
            tl.set(riveAtomoRef.current, { opacity: '0', display: 'none' }, '<')
            tl.to(navigationRef.current, { duration: 0.8, scale: 1, transformOrigin: '98% 2%', background: '#B3FC03', ease: 'Power4.easeInOut' }, '<')
            tl.to(logoRef.current, { duration: 0, borderRight: '1px solid #101010', ease: 'Power4.easeInOut' }, '<')
            tl.to(menuRef.current, { duration: 0.6, opacity: 1, scale: 1, transformOrigin: '98% 2%', display: 'block', ease: 'Power4.easeInOut' }, '<')
            tl.to(svgRef.current, { duration: 0, color: '#101010', ease: 'Power4.easeInOut' }, '<')
            tl.to(btnRef.current, { duration: 0, background: '#101010', color: '#B3FC03', ease: 'Power4.easeInOut' }, '<')
            tl.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid #101010', ease: 'Power4.easeInOut' }, '<')
            tl.to(btnPlus.current, { duration: 0, innerHTML: '-', ease: 'Power4.easeInOut' }, '<')
            tl.to(riveRef.current, { duration: 1.2, scale: 0.2, x: '-113rem', y: '8.2rem', ease: 'Power4.easeInOut', delay: '1000ms' })
            tl.to(riveAtomoRef.current, { duration: 1.2, scale: 0.2, x: '-113rem', y: '8.2rem', ease: 'Power4.easeInOut', delay: '1000ms' }, '<')
            tl.to(riveDuoRef.current, { duration: 1.2, scale: 0.2, x: '-113rem', y: '8.2rem', ease: 'Power4.easeInOut', delay: '1000ms' }, '<')
            tl.to(riveRefMobile.current, { duration: 0.6, opacity: 1, scale: 0.5, x: '8rem', y: '15rem', ease: 'Power4.easeInOut' }, '<')
            tl.to(menuTextRef.current, { duration: 1.4, opacity: 1, ease: 'Power4.easeInOut' }, '<0.6')
            tl.to(menuItem1Ref.current, { duration: 0.8, opacity: 1, x: '0rem', ease: 'Power4.easeInOut' }, '<0.2')
            tl.to(menuItem2Ref.current, { duration: 0.8, opacity: 1, x: '0rem', ease: 'Power4.easeInOut' }, '<0.2')
            tl.to(menuItem3Ref.current, { duration: 0.8, opacity: 1, x: '0rem', ease: 'Power4.easeInOut' }, '<0.2')

            tlReverse.to(navigationRef.current, { duration: 0.6, scale: 1, transformOrigin: '98% 2%', background: '#101010', ease: 'Power4.easeInOut' })
            tlReverse.to(logoRef.current, { duration: 0, borderRight: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(svgRef.current, { duration: 0, color: '#B3FC03', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(menuDivRef.current, { duration: 0, borderLeft: '1px solid rgba(239, 239, 210, 0.3)', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(btnRef.current, { duration: 0, background: '#B3FC03', color: '#101010', ease: 'Power4.easeInOut' })
            tlReverse.to(menuItem3Ref.current, { duration: 0.8, opacity: 0, x: '-3rem', ease: 'Power4.easeInOut' }, '<0.8')
            tlReverse.to(menuItem2Ref.current, { duration: 0.8, opacity: 0, x: '-3rem', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(menuItem1Ref.current, { duration: 0.8, opacity: 0, x: '-3rem', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(menuTextRef.current, { duration: 0.8, opacity: 0, ease: 'Power4.easeInOut' }, '<0.3')
            tlReverse.to(btnPlus.current, { duration: 0, innerHTML: '+', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(riveRef.current, { duration: 0.8, scale: 1, x: '0rem', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(riveRef.current, { duration: 0.8, opacity: '0', ease: 'Power4.easeInOut' })
            tlReverse.to(riveAtomoRef.current, { duration: 0.8, scale: 0.4, x: '-36rem', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(riveAtomoRef.current, { duration: 0.8, opacity: '0', ease: 'Power4.easeInOut', delay: 0.3 }, '<')
            tlReverse.to(riveDuoRef.current, { duration: 0.8, scale: 0.6, x: '-24rem', y: "20rem", ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(riveDuoRef.current, { duration: 0.8, opacity: '0', ease: 'Power4.easeInOut', delay: 0.3 }, '<')
            tlReverse.to(riveRefMobile.current, { duration: 0.6, opacity: 1, scale: 1, x: '0rem', y: '0rem', ease: 'Power4.easeInOut' }, '<')
            tlReverse.to(menuRef.current, { duration: 0.7, opacity: 0, scale: 0, display: 'none', ease: 'Power4.easeInOut', delay: 0.3 }, '<')

            if (router.pathname === '/contact') {
                GSAP.set(navigationRef.current, { duration: 0, background: '#B3FC03 !important' })
            }

            if (isActive) {
                tl.play()
                toggleScroll(true)
            } else {
                tlReverse.play()
                toggleScroll(false)
            }
        }

    }, [isActive, router.pathname])

    const atomRide = () => {
        GSAP.set(riveRef.current, { opacity: 0 })
        GSAP.set(riveRef.current, { display: 'none' })
        GSAP.set(riveAtomoRef.current, { display: 'flex' }, '<')
        GSAP.set(riveAtomoRef.current, { opacity: '1' }, '<')
    }

    const duoRide = () => {
        GSAP.set(riveRef.current, { opacity: 0 })
        GSAP.set(riveRef.current, { display: 'none' })
        GSAP.set(riveDuoRef.current, { display: 'flex' }, '<')
        GSAP.set(riveDuoRef.current, { opacity: '1' }, '<')
    }

    const toggleScroll = (disable) => {
        if (disable) {
            document.body.style.overflow = 'hidden';
            if (Lenis) {
                Lenis.setScroll(0);
            }
        } else {
            document.body.style.overflow = '';
        }
    }

    const onClick = () => {
        if (isAnimating) return;

        setIsActive(!isActive)

        if (!isActive) {
            toggleScroll(true);
        } else {
            toggleScroll(false);
        }

        setLogoColor(logoColor === 'original' ? 'black' : 'original')
    }

    const onHomeClick = () => setIsActive(false)

    const onClickAtom = () => {
        onClick()
        atomRide()
    }

    const onClickDuo = () => {
        onClick()
        duoRide()
    }

    return (
        <>
            <div className={`${styles.navigation} ${logoColor === 'black' ? styles.border__c : ''}`} ref={navigationRef}>
                <Link className={`${styles.logo__wrapper} ${isAnimating ? styles.disable : ''}`} ref={logoRef} onClick={onHomeClick} href={'/'}>
                    <div className={styles.logo} ref={svgRef}>
                        <Rive
                            src={KandRive}
                            className={`${styles.logo} ${logoColor === 'original' ? styles.logo__visible : styles.logo__hidden}`}
                            artboard="Rive Mundo"
                        />
                        <Rive
                            src={KandRive}
                            className={`${styles.logo} ${logoColor === 'black' ? styles.logo__visible : styles.logo__hidden}`}
                            artboard="Rive MundoBlack" />
                    </div>
                </Link>
                <div className={`${styles.menu} ${isAnimating ? styles.disable : ''}`} ref={menuDivRef} onClick={onClick}>
                    <button className={styles.icon} ref={btnRef}>
                        <div className={styles.plus} ref={btnPlus}>+</div>
                    </button>
                </div>
            </div>

            <div className={styles.menu__wrapper} ref={menuRef}>
                <div className={styles.menu__content}>
                    <div ref={riveRef} className={styles.olho}>
                        <Rive src={KandRive} className={styles.olho_rive} artboard='Rive Olho' />
                    </div>
                    <div ref={riveDuoRef} className={styles.duo}>
                        <Rive src={KandRive} className={styles.duo_rive} artboard='Rive DuoBlack' />
                    </div>
                    <div ref={riveAtomoRef} className={styles.atomo}>
                        <Rive src={KandRive} className={styles.atomo_rive} artboard='Rive AtomoBlack' />
                    </div>
                    <div ref={riveRefMobile} className={styles.olho_mobile}>
                        <Rive src={KandRive} className={styles.olho_rive_mobile} artboard='Rive Olho' />
                    </div>
                    <div className={styles.text__box} ref={menuTextRef}>
                        <div className={styles.menu__text}>{navigationData.title}</div>
                        <div className={styles.line} />
                    </div>
                    <ul className={styles.menu__list}>
                        <li className={`${styles.menu__item} ${isAnimating ? styles.disable : ''}`} onClick={onClickAtom} ref={menuItem1Ref}><Link href={'/projects'}>{navigationData.work_title}</Link></li>
                        <li className={`${styles.menu__item} ${isAnimating ? styles.disable : ''}`} onClick={() => { onClickDuo(); delayedNavigate('/about') }} ref={menuItem2Ref}><a>{navigationData.about_title}</a></li>
                        <li className={`${styles.menu__item} ${isAnimating ? styles.disable : ''}`} onClick={() => { onClick(); delayedNavigate('/contact') }} ref={menuItem3Ref}><a>{navigationData.contact_title}</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
