export const convertPxToRem = (px: number) => {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize)
}
