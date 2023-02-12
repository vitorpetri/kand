import GSAP from 'gsap'

export const clamp = GSAP.utils.clamp
export const lerp = GSAP.utils.interpolate
export const random = GSAP.utils.random

export function map (
  num: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
  round: boolean = false,
  constrainMin: boolean = true,
  constrainMax: boolean = true
) {
  if (constrainMin && num < min1) return min2
  if (constrainMax && num > max1) return max2

  const num1 = (num - min1) / (max1 - min1)
  const num2 = (num1 * (max2 - min2)) + min2

  if (round) {
    return Math.round(num2)
  }

  return num2
}
