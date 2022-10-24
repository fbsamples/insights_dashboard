import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="shortcut" href="../static/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Dashboard Insights</title>
      </Head>
      <Component {...pageProps} />
    </div>
    )
}
