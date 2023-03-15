import Head from 'next/head'
import Image from 'next/image'

import DuoSvg from '@/public/duo.svg'

import SeparatorLine from '@/components/SeparatorLine'
import Description from '@/components/Description'
import Profile from '@/components/Profile'
import Clients from '@/components/Clients'
import Awards from '@/components/Awards'

import styles from './styles.module.sass'

export default function Home() {
  return <>
    <Head>
      <title>KAND | About</title>
    </Head>

    <div className={styles.wrapper}>
      <Image className={styles.icon} src={DuoSvg} alt="World"/>
      <h1 className={styles.title}>About</h1>
      <SeparatorLine />

      <Description />

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