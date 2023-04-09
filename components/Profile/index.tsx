import styles from './styles.module.sass'

export default function Profile() {
  return <div className={styles.wrapper}>
    <div className={styles.info}>
      <h1 className={styles.name}>Kaue</h1>
      <h1 className={styles.surname}>Barbosa</h1>
      <h2 className={styles.role}>Creative Art Director</h2>
    </div>
    <div className={styles.content}>
      <div className={styles.paragraph}>
        <h3 className={styles.title}>Previous Experience</h3>
        <p className={styles.text}>AFIRCA DDB</p>
        <p className={styles.description}>2021</p>
      </div>
    </div>
  </div>
}