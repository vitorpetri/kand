import styles from './styles.module.sass'
import { useState, useRef, useEffect } from 'react'
import GSAP from 'gsap'

import Line from '@/components/Line'

export default function Crew({project}) {
  const [isActive, setIsActive] = useState(false)

  const toggle = () => setIsActive(!isActive)

  const boxRef = useRef(null)

  useEffect(() => {
    // we need to destroy? just with display: none?
    // we can storage the two consts in the same, makes sanse since both will stay paused?
    // const tl, tlReverse = GSAP.timeline({ paused: true })
    const tl = GSAP.timeline({ paused: true })
    const tlReverse = GSAP.timeline({ paused: true })

    tl.to(boxRef.current, { duration: 0.5, opacity: 1, ease: 'power2.out' }, '+=0.1')
    tlReverse.to(boxRef.current, { duration: 0.5, opacity: 0, ease: 'power2.out' })

    if (isActive) {
      tl.play()
    } else {
      tlReverse.play()
    }
  }, [isActive])

  return <div className={styles.crew}>
    <div className={styles.crew__button} onClick={toggle}>
      <div className={styles.crew__button__title}>Crew</div>
      <button className={styles.crew__button__icon}>+</button>
    </div>

    <div className={styles.crew__box} ref={boxRef}>
      <div className={styles.crew__box__button} onClick={toggle}>
        <h1 className={styles.crew__box__button__title}>Crew</h1>
        <h1 className={styles.crew__box__button__icon}> - </h1>
      </div>
      <div className={styles.crew__box__content}>
        <ul className={styles.crew__box__list}>
          {/* PRISMIC REPEATABLE */}
          <li className={styles.crew__box__item}>
            <h3 className={styles.crew__box__item__title}>Angency</h3>
            {/* PRISMIC REPEATABLE */}
            <p className={styles.crew__box__item__text}>White Rabbit Budappest</p>
          </li>
        </ul>
        <img className={styles.crew__box__icon} src="" alt="" />
    </div>

    {/* {project.crew.map((crew, index) => {
      if (crew.title) { return (
      <h3 key={index} onClick={() => {}} className={styles.crew__title}>
        {crew.title ? crew.title : ''}
      </h3>
    )}})}

    <div className={styles.crew__text}>
      {project.crew.map((crew, index) => {
        if (crew.text) { return (
        <p key={index} onClick={() => {}} className={styles.crew__paragraph}>
          {crew.text ? crew.text : ''}
        </p>
      )}})} */}
    </div>
    <Line />
  </div>
}