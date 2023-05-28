import styles from './styles.module.sass'
import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Page from '../../components/Page'
import Render from '../../components/Render'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

import SeparatorLine from '../../components/SeparatorLine'
import Description from '../../components/Description'
import Profile from '../../components/Profile'
import Clients from '../../components/Clients'
import Awards from '../../components/Awards'

import DuoSvg from '../../public/duo.svg'

export default function About(data, shared) {

    const elementRef = useRef(null)


    return (
        <Page
            className={styles.element}
            ref={elementRef}
            shared={shared}
        >
            <Head>
                <title>KAND | About</title>
            </Head>

            <div className={styles.wrapper}>
                <Image className={styles.icon} src={DuoSvg} alt="World" />
                <h1 className={styles.title}>{data.title}</h1>
                <SeparatorLine />

                <Description data={data} />

                <SeparatorLine />

                <Profile data={data} />

                <SeparatorLine />

                <Clients data={data} />

                <SeparatorLine />

                <Awards data={data} />

                <SeparatorLine />

                <div className={styles.footer}>
                    <p className={styles.bottom__design}>
                        Design by
                        <strong>US</strong>
                    </p>

                    <Image className={styles.bottom__icon} src={DuoSvg} alt="World" />

                    <p className={styles.bottom__code}>
                        Code by
                        <a href='https://twitter.com/whizzbbig' target='blank'>Ojas</a>
                        <strong>&</strong>
                        <a href='https://vitorpetri.com' target='blank'>Vitor</a>
                    </p>
                </div>
            </div>
        </Page>
    )
}

export async function getServerSideProps() {
    const client = createClient({ accessToken: sm.token })

    const about = await client.getByType('about')
    const data = about?.results[0]?.data

    return {
        props: { ...data },
    }
}
