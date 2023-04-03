import { ReactNode, FC } from 'react'
import styles from './styles.module.scss'

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={styles.element}>
      {children}
    </main>
  )
}

export default Main