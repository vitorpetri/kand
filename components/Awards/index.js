import React from 'react'

import styles from './styles.module.sass'

function addLineBreak(str) {
    const input = str || ''
    const lines = input.split('\n')
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
            <h1 className={styles.title}>{data.award_title}</h1>

            <div className={styles.content}>
                {awards.map(slice => (
                    <div className={styles.awards__wrapper}>
                        <div className={styles.awards__title}>{slice.primary.award}</div>
                        <ul className={styles.awards}>
                            {slice.items.map(item => (
                                <li className={styles.award}>
                                    <h3 className={styles.award__title}>{item.title}</h3>
                                    <p className={styles.award__item}>{addLineBreak(item.sub_title)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
