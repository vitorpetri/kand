import '../styles/index.sass'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

import Lenis from '../utils/scroll'
import TransitionLayout from '../components/TransitionLayout'
import { useTransitionFix } from '../hooks/useTransitionFix'
import { getBoundingClientRect } from '../utils/dom'
import useResize from '../hooks/useResize'

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'
import { createClient } from '../prismicio'
import sm from '../sm.json'

import Navigation from '../components/Navigation'

const fetchNavigationData = async () => {
    const client = createClient({ accessToken: sm.token })
    const navigation = await client.getByType('navigation')
    return navigation?.results[0]?.data
}

export default function App({ Component, pageProps, data, router }) {
    useTransitionFix()
    const { events } = useRouter()

    useEffect(() => {
        const forceRepaint = () => {
            document.body.offsetHeight;
        };
        forceRepaint();
    }, [])

    const onHashChange = (route) => {
        const [_, hash] = route.split('#')

        if (hash) {
            const section = document.querySelector(`#${hash}`)

            if (section) {
                const { top } = getBoundingClientRect(section)
                const value = top

                Lenis?.scrollTo(value)
            }
        }
    }

    const onResize = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
    }

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        onResize()

        router.events.on('hashChangeStart', onHashChange)

        return () => {
            router.events.off('hashChangeStart', onHashChange)
        }
    }, [])

    useResize(onResize)

    return (
        <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
            <PrismicPreview repositoryName={repositoryName}>
                <Head>
                    <title>KAUE & DALTRO</title>
                    <meta name="description" content="Design Duo" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="google-site-verification" content="ZIuWyRpmj_AHeM33o1BpwaiFah1VF8L0sK7XQRLv2fc" />
                    <link rel="icon" href="/mundo.svg" />
                </Head>
                <div className="top" />
                <div className="border" />
                <div className="bottom" />
                <div className="grain" />
                <Navigation navigationData={data} />
                <TransitionLayout>
                    <Component {...pageProps} shared={data} />
                </TransitionLayout>
            </PrismicPreview>
        </PrismicProvider>
    )
}

App.getInitialProps = async (appContext) => {
    const { Component, ctx } = appContext;
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    const data = await fetchNavigationData();
    return { pageProps, data };
};
