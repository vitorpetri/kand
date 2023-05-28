import styles from './Page.module.scss'

import classNames from 'classnames';
import Head from 'next/head';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';


const Page = forwardRef(({
    children,
    className,
    metadata = {},
    navigation,
}, ref) => {

    console.log(navigation);


    const {
        title = '',
        description = '',
        keywords = '',
        image = ''
    } = metadata;

    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Head>


            <div className={classNames(styles.element, className)} ref={ref}>
                <div className="top" />
                <div className="border" />
                <div className="bottom" />
                <div className="grain" />
                <Navigation navigationData={navigation} />

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    )
})

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    className: PropTypes.string,
    metadata: PropTypes.object,
    navigation: PropTypes.object,
};

export default Page;
