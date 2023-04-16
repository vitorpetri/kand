import styles from './styles.module.sass'

export default function Clients() {
  return <div className={styles.wrapper}>
    <h1 className={styles.title}>Clients</h1>

    <div className={styles.type}>
      <div className={styles.type__title}>Beers & Spirits</div>
      <ul className={styles.clients}>
        <li className={styles.client}>
          <div className={styles.client__image}></div>
        </li>
      </ul>
    </div>
  </div>
}