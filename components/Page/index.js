import styles from './Page.module.sass'

import classNames from 'classnames';
import Head from 'next/head';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Navigation from '../Navigation';

const Page = forwardRef(({
    children,
    className,
    metadata = {},
}, ref) => {

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
