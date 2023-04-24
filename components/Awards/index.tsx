import React from 'react'
import styles from './styles.module.sass'

function addLineBreak(str) {
    const lines = str.split('\n')
    const modifiedLines = lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
        </React.Fragment>
    ))
    return modifiedLines
}


export default function Awards({ data }) {

    const awards = data.slices2.filter((slice) => slice.variation === 'awardCategories')

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: data.award_title}} />

            <div className={styles.content}>
                {awards.map(slice => (
                    <div className={styles.awards__wrapper}>
                        <div className={styles.awards__title} dangerouslySetInnerHTML={{ __html:slice.primary.award}} />
                        <ul className={styles.awards}>
                            {slice.items.map(item => (
                                <li className={styles.award}>
                                    <h3 className={styles.award__title} dangerouslySetInnerHTML={{ __html: item.title}} />
                                    <p className={styles.award__item} dangerouslySetInnerHTML={{ __html:addLineBreak(item.sub_title)}} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
