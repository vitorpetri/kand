import styles from './styles.module.sass'

export default function Awards() {
  return <div className={styles.wrapper}>
    <h1 className={styles.title}>Awards</h1>
    
    <div className={styles.awards}>
      <div className={styles.title}></div>
      <p className={styles.description}></p>
    </div>
  </div>
}