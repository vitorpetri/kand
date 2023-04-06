import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GSAP from 'gsap'
import { convertPxToRem } from 'utils/functions'
import useDetectOrientation from 'hooks/useDetectOrientation'
import Lenis from 'utils/scroll'

const ease = 'Expo.easeInOut'
const duration = 1.5

export default () => {
  const router = useRouter()
  const [clicked, setClicked] = useState(false)
  const { isMobile } = useDetectOrientation()

  const onClick = (src: string) => {
    if (clicked) return
    setClicked(true)

    if (isMobile) {
      onClickMobile(src)
    } else {
      onClickDesktop(src)
    }
  }

  const onClickDesktop = (src: string) => {
    const { parent, title, subtitle, text, imageOverflow, imageContainer, button, img } = getSelectors(src)

    if (!title || !subtitle || !text || !imageOverflow) return

    Lenis?.stop()

    const mq1280 = window.matchMedia("(max-width: 1280px) and (min-width: 960px)").matches

    const values = {
      xContainer: '122rem',
      xSubtitle: '42.6rem',
      yTitle: calcYFromElement(title, 25.5 + 7.4),
      ySubtitle: calcYFromElement(subtitle, 47.209375 + 6.4),
      yText: calcYFromElement(text, 71.61875),
      yImage: calcYFromElement(imageOverflow, 76.7078125)
    }

    if (mq1280) {
      values.xContainer = '87rem'
      values.xSubtitle = '30.3rem'
      values.yTitle = calcYFromElement(title, 25.5 + 5.9)
      values.ySubtitle = calcYFromElement(subtitle, 47.209375 + 4.9)
      values.yText = calcYFromElement(text, 71.7),
      values.yImage = calcYFromElement(imageOverflow, 77.8)
    }

    GSAP.set(parent, { x: 0 })
    GSAP.set([title, subtitle, text, imageContainer], { x: values.xContainer })
    GSAP.set([title, subtitle], { lineHeight: 'auto' })

    GSAP.to(title, { duration, ease, fontSize: '21.5rem', x: '7.45rem', y: values.yTitle })
    GSAP.to(subtitle, { duration, ease, fontSize: '21.5rem', x: values.xSubtitle, y: values.ySubtitle })
    GSAP.to(text, { ease, duration, x: '7.45rem', y: values.yText })
    GSAP.to(imageOverflow, { ease, duration, height: '100%', width: '100%', x: 0 })
    GSAP.to(imageContainer, { ease, duration, height: '128.8rem', width: '177.1rem', x: '7.48rem', y: values.yImage })
    GSAP.to(
      [
        '[data-anim-footer-item]',
        '[data-anim-about-element]',
        `[data-anim-accommodation-src]:not([data-anim-accommodation-src="${src}"])`,
        button
      ], { autoAlpha: 0, duration: 1 })
    GSAP.to(img, { scale: 1, duration: 0.8, delay: 0.5 })
    GSAP.to({} , { duration, onComplete: () => {
      Lenis?.start()
      router.push(`/accommodation/${src}`)
    }})
  }

  const onClickMobile = (src: string) => {
    const { title, subtitle, text, imageOverflow, button, img } = getSelectors(src)

    if (!title || !subtitle || !text || !imageOverflow) return

    Lenis?.stop()
    
    GSAP.set([title, subtitle], { lineHeight: 'auto' })
    GSAP.set(imageOverflow, { overflow: 'initial' })

    GSAP.to(title, { duration, ease, y: calcYFromElement(title, 13.5) })
    GSAP.to(subtitle, { duration, ease, y: calcYFromElement(subtitle, 20.368 - 1) })
    GSAP.to(text, { ease, duration, y: calcYFromElement(text, 29.937) })
    GSAP.to(img, { ease, duration, height: '31.3rem', width: '62.6rem', y: calcYFromElement(imageOverflow, 35.065) })
    GSAP.to(
      [
        '[data-home-section-about]',
        '[data-anim-footer-item]',
        '[data-anim-about-element]',
        `[data-anim-accommodation-src]:not([data-anim-accommodation-src="${src}"])`,
        button
      ], { autoAlpha: 0, duration: 1 }
    )
    GSAP.to({} , { duration, onComplete: () => {
      Lenis?.start()
      router.push(`/accommodation/${src}`)
    }})
  }

  const onMouseEnter = (src: string) => {
    if (clicked || isMobile) return

    const img = document.querySelector(`[data-anim-accommodation-image][data-anim-accommodation-src="${src}"]`)

    GSAP.killTweensOf(img)

    GSAP.to(img, { scale: 1.1, duration: 1.2, ease: 'Power3.easeInOut' })
  }

  const onMouseLeave = (src: string) => {
    if (clicked || isMobile) return

    const img = document.querySelector(`[data-anim-accommodation-image][data-anim-accommodation-src="${src}"]`)

    GSAP.killTweensOf(img)

    GSAP.to(img, { scale: 1, duration: 0.9, ease: 'Power3.easeInOut' })
  }

  const getSelectors = (src: string) => {
    const parent = document.querySelector(`[data-accommodation-item][data-anim-accommodation-src="${src}"]`) as HTMLDivElement
  
    const title = document.querySelector(`[data-anim-accommodation-title][data-anim-accommodation-src="${src}"]`)
    const subtitle = document.querySelector(`[data-anim-accommodation-subtitle][data-anim-accommodation-src="${src}"]`)
    const text = document.querySelector(`[data-anim-accommodation-text][data-anim-accommodation-src="${src}"]`)
    const imageOverflow = document.querySelector(`[data-anim-accommodation-image-overflow][data-anim-accommodation-src="${src}"]`)
    const imageContainer = document.querySelector(`[data-anim-accommodation-image-container][data-anim-accommodation-src="${src}"]`)
    const button = document.querySelector(`[data-anim-accommodation-button][data-anim-accommodation-src="${src}"]`)
    const img = document.querySelector(`[data-anim-accommodation-image][data-anim-accommodation-src="${src}"]`)
  
    return { parent, title, subtitle, text, imageOverflow, imageContainer, button, img }
  }
  
  const calcYFromElement = (element: Element, increment: number) => {
    const { y } = element.getBoundingClientRect()
    const yRem = convertPxToRem(y * -1)
    return `${yRem + increment}rem`
  }

  return { onClick, clicked, onMouseEnter, onMouseLeave }
}