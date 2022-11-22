import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducer';

import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <div>
        <Head>
          <link rel="shortcut" href="../static/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <title>Insights Dashboard</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </Provider>
    )
}
