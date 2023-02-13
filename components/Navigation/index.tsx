import styles from './styles.module.sass'

import { useState } from 'react'

import MundoSvg from '@/public/mundo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  const [isActive, setIsActive] = useState<boolean>(false)

  const onClick = () => setIsActive(!isActive)
  
  return <>
    <div className={styles.navigation}>
      <Link className={styles.logo} href={'/'}><Image src={MundoSvg} alt="World"/></Link>
      <div className={styles.menu}><button onClick={onClick} className={styles.icon}>+</button></div>
    </div>
    <div className="menu">

    </div>
  </>
}
