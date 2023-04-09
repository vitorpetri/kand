import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

import DuoSvg from 'public/duo.svg'

import SeparatorLine from '@/components/SeparatorLine'
import Description from '@/components/Description'
import Profile from '@/components/Profile'
import Clients from '@/components/Clients'
import Awards from '@/components/Awards'

type Page = {
  data: {
    title: string
  }
}

import styles from './styles.module.sass'
import { createClient } from '../../prismicio'
import sm from '../../sm.json'

export interface IAbout {
  title: string
}

const About: FC<IAbout> = (data) => {
  return <>
    <Head>
      <title>KAND | About</title>
    </Head>

    <div className={styles.wrapper}>
      <Image className={styles.icon} src={DuoSvg} alt="World"/>
      <h1 className={styles.title}>{data.title}</h1>
      <SeparatorLine />

      <Description data={data} />

      <SeparatorLine />

      <Profile />

      <SeparatorLine />

      <Profile />

      <SeparatorLine />

      <Clients />

      <SeparatorLine />

      <Awards />

      <SeparatorLine />

      <Image className={styles.icon} src={DuoSvg} alt="World"/>
    </div>          
  </>
}

export default About

export async function getServerSideProps() {
  const client = createClient({ accessToken: sm.token })

  const about = await client.getByType('about')
  const data = about?.results[0]?.data

  return {
    props: { ...data },
  }
}
