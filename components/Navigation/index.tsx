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
  

  console.log(isActive)

  //timline
  const tl = GSAP.timeline({ paused: true })
  const reverseTl = GSAP.timeline({ paused: true })

  //set
  tl.set(navigationRef.current, { background: '#0B0B0B' })

  //animation
  tl.to(navigationRef.current, { duration: 0, background: 'transparent', ease: 'Expo.easeInOut' })
  tl.to(menuRef.current, { 
    duration: 0.5, 
    opacity: 1, 
    scale: 1,
    transformOrigin: '98% 2%',
    display: 'block', 
    ease: 'Expo.easeInOut'
  })
  tl.to(menuContentRef.current, { duration: 0.5, opacity: 1, ease: 'Expo.easeInOut' })

  //reverse
  reverseTl.to(navigationRef.current, { duration: 0, background: '#0B0B0B', ease: 'Expo.easeInOut' })
  reverseTl.to(menuContentRef.current, { duration: 0.5, opacity: 0, ease: 'Expo.easeInOut' })
  reverseTl.to(menuRef.current, { duration: 0.5, opacity: 0, scale: 0, display: 'none', ease: 'Expo.easeInOut' })

  //play
  if (isActive) {
    tl.play()
  } else {
    reverseTl.play()
  }

  return <>
    <div className={styles.navigation} ref={navigationRef}>
      <Link className={styles.logo}onClick={onHomeClick} href={'/'}><Image src={MundoSvg} alt="World"/></Link>
      <div className={styles.menu} onClick={onClick}><button className={styles.icon}>+</button></div>
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
