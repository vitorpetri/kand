export const getBoundingClientRect = (element) => {
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
