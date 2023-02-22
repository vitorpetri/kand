import styles from './styles.module.sass'

import { useState, useRef } from 'react'

import GSAP from 'gsap'

import MundoSvg from '@/public/mundo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  const [isActive, setIsActive] = useState<boolean>(false)

  const onClick = () => setIsActive(!isActive)
  const onHomeClick = () => setIsActive(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  
  //timline
  const tl = GSAP.timeline({ paused: true })
  const reverseTl = GSAP.timeline({ paused: true })

  //set
  tl.set(navigationRef.current, { background: '#0B0B0B' })

  //animation
  tl.to(navigationRef.current, { duration: 0, background: 'transparent', ease: 'Expo.easeInOut' })
  tl.to(menuRef.current, { 
    duration: 0.6, 
    opacity: 1, 
    scale: 1,
    transformOrigin: '98% 2%',
    display: 'block', 
    ease: 'Expo.easeInOut'
  })
  tl.to(svgRef.current, { duration: 0, color: '#0B0B0B', ease: 'Expo.easeInOut' })
  tl.to(btnRef.current, { duration: 0, innerHTML: '-', ease: 'Expo.easeInOut' })
  tl.to(btnRef.current, { duration: 0, background: '#0B0B0B', color: '#B3FC03', ease: 'Expo.easeInOut' })
  tl.to(menuContentRef.current, { duration: 0.4, opacity: 1, ease: 'Expo.easeInOut' })

  //reverse
  reverseTl.to(menuContentRef.current, { duration: 0.3, opacity: 0, ease: 'Expo.easeInOut' })
  reverseTl.to(svgRef.current, { duration: 0, color: '#B3FC03', ease: 'Expo.easeInOut' })
  reverseTl.to(btnRef.current, { duration: 0, innerHTML: '+', ease: 'Expo.easeInOut' })
  reverseTl.to(btnRef.current, { duration: 0, background: '#B3FC03', color:'#0B0B0B', ease: 'Expo.easeInOut' })
  reverseTl.to(menuRef.current, { duration: 0.7, opacity: 0, scale: 0, display: 'none', ease: 'Expo.easeInOut' })
  reverseTl.to(navigationRef.current, { duration: 0, background: '#0B0B0B', ease: 'Expo.easeInOut' })

  //play
  if (isActive) {
    tl.play()
  } else {
    reverseTl.play()
  }

  return <>
    <div className={styles.navigation} ref={navigationRef}>
      <Link className={styles.logo__wrapper} onClick={onHomeClick} href={'/'}>
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
      <div className={styles.menu} onClick={onClick}><button className={styles.icon} ref={btnRef}>+</button></div>
    </div>

    <div className={styles.menu__wrapper} ref={menuRef}>
      <div className={styles.menu__content} ref={menuContentRef}>
        <div className="">O</div>
        <div className={styles.menu__text}>WHAT DO YOU WANNA SEE NOW?</div>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item} onClick={onClick}><Link href={'/projects'}>Work</Link></li>
          <li className={styles.menu__item} onClick={onClick}><Link href={'/about'}>About</Link></li>
          <li className={styles.menu__item} onClick={onClick}><Link href={'/contact'}>Contact</Link></li>
        </ul>
      </div>
    </div>
</>
}
