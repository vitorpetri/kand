import Router from 'next/router'
import { useEffect } from 'react'

export const OPACITY_EXIT_DURATION = 1

export const useTransitionFix = () => {
    useEffect(() => {
        let timeout = null

        const routeChange = () => {
            clearTimeout(timeout)

            const elements = document.querySelectorAll('style[media="x"]')

            elements.forEach((elem) => elem.removeAttribute('media'))

            timeout = setTimeout(() => {
                elements.forEach((elem) => elem.remove())
            }, OPACITY_EXIT_DURATION * 1000)
        }

        Router.events.on('routeChangeComplete', routeChange)
        Router.events.on('routeChangeStart', routeChange)

        return () => {
            Router.events.off('routeChangeComplete', routeChange)
            Router.events.off('routeChangeStart', routeChange)

            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        const pathname = Router.router?.pathname
        const query = Router.router?.query

        if (pathname === '/_error') {
            return
        }

        Router.router?.push({ pathname, query })
    }, [])

    return null
}
