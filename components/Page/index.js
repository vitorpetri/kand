import classNames from 'classnames';
import Head from 'next/head';
import React, { forwardRef } from 'react';

import Footer from 'components/Footer';
import Navigation from 'components/Navigation';

import styles from './Page.module.scss';

const Page = React.forwardRef(
    (
        { children, className, metadata, shared },
        ref
    ) => {
        const {
            cookies: { content: cookies },
            footer: { content: footer },
            navigation: { content: navigation },
        } = shared;

        return (
            <>
                <Head>
                    <title>{metadata.title}</title>

                    <meta name="description" content={metadata.description} />
                    <meta name="keywords" content={metadata.keywords} />

                    <meta property="og:title" content={metadata.title} />
                    <meta property="og:description" content={metadata.description} />
                    <meta property="og:image" content={metadata.image} />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={metadata.title} />
                    <meta name="twitter:description" content={metadata.description} />
                    <meta name="twitter:image" content={metadata.image} />
                </Head>

                <div className={classNames(styles.element, className)} ref={ref}>
                    <Navigation {...navigation} />

                    <div className={styles.content}>{children}</div>

                    <Footer {...footer} />
                </div>
            </>
        );
    }
);

export default Page;
