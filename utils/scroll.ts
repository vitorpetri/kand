import Lenis from '@studio-freight/lenis'

let LenisManager: Lenis | null = null

function rAF(time: number) {
  LenisManager?.raf(time)

  requestAnimationFrame(rAF)
}

if (typeof window !== 'undefined') {
  LenisManager = new Lenis({
    direction: 'vertical',
    duration: 1,
    gestureDirection: 'vertical',
    mouseMultiplier: 0.5,
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
  })

  requestAnimationFrame(rAF)
}

export interface IInstanceOptions {
  direction: number
  limit: number
  progress: number
  scroll: number
  velocity: number
}

export default LenisManager
