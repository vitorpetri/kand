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

    console.log(awards)

    awards.map(slice => {
        slice.items.map((item) => {
            console.log(item.title, item.sub_title);

        })
    })


    return <div className={styles.wrapper}>
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
}

/*
<div className={styles.awards__title}>Professional Awards</div>
        <ul className={styles.awards}>

          <li className={styles.award}>
            <h3 className={styles.award__title}>ONE SHOW</h3>
            <ul className={styles.award__list}>
              <li className={styles.award__item}>1x BRONZE</li>
              <li className={styles.award__item}>1x SHORTLIST</li>
              <li className={styles.award__item}>1x MERIT</li>
            </ul>
          </li>

          </ul>
*/
