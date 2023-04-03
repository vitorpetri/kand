import styles from './styles.module.sass'

import Line from '@/components/Line'

export default function Profile() {
  return <div className={styles.description}>
    <h3 className={styles.description__title}>We are</h3>
    
    <div className={styles.description__text}>
      <p className={styles.description__paragraph}>
        a 150+ award-winning creative duo currently working at allu, one of the fastest growing startups in Brazil.
      </p>

      <p className={styles.description__paragraph}>
        For almost 10 years we have been solving problems for big clients around the world with disruptive and effective ideas. But before we get to our past experience, clients, awards and all that stuff you are used to seeing in an "about", let us explain why we work so well together.
      </p>

      <p className={styles.description__paragraph}>
        Just imagine two dudes that are the extreme opposite of each other. That's us. Kauê likes Rock'n Roll. Daltro likes Samba. Kauê is into bodybuilding and jiu jitsu. Daltro is into soccer and basketball. Kauê's favorite drink is "any sweet alcoholic drink with a little umbrella on it". Daltro's favorite drink is beer. Anyway, we could do this all day long, but you got the idea. 
      </p>

      <p className={styles.description__paragraph}>
        We only have one thing in common: the love for great work. We use all our different backgrounds to think of the best possible ideas for our clients. And it has been working out pretty well for us. So we plan to keep doing that for many years to come. 
      </p>

      <Line />
    </div>
  </div>
}