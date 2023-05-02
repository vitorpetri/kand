import styles from './styles.module.sass'

import * as prismicH from '@prismicio/helpers'

export default function Clients({ data }) {
    const client = data.slices1.filter((slice) => slice.variation === 'industryClients')

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{data.client_title}</h1>

            <div className={styles.clients}>
                {client.map((slice, index) => {
                    return (
                        <div className={styles.client} key={index}>
                            <div className={styles.type__title}>{slice.primary.topic}</div>
                            <div className={styles.client__image}>
                                {slice.items.map((item, index) => (
                                    <img src={prismicH.asImageSrc(item.logo, { lossless: true, q: 100 }) || ''} alt={item.logo.alt} key={index} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
