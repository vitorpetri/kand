export const getBoundingClientRect = (element: Element) => {
  const bounds = element.getBoundingClientRect()

  return {
    bottom: bounds.bottom,
    height: bounds.height,
    left: bounds.left,
    top: bounds.top + window.pageYOffset,
    right: bounds.right,
    width: bounds.width
  }
}

export interface IBounds {
  bottom: number
  height: number
  left: number
  top: number
  right: number
  width: number
}
