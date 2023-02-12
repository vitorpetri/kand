import styles from './styles.module.sass'

import MundoSvg from '@/public/mundo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  return <>
    <div className={styles.navigation}>
      <Link className={styles.logo} href={'/'}><Image src={MundoSvg} alt="World"/></Link>
      <div className={styles.menu}><div className={styles.icon}>+</div></div>
    </div>
  </>
}
