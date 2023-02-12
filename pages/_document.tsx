import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>KAUE & DALTRO</title>
        <meta name="description" content="Design Duo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mundo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
