import { ReactNode, FC } from 'react'
import styles from './styles.module.sass'

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={styles.element}>
      {children}
    </main>
  )
}

export default Main