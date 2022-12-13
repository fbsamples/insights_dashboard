import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { wrapper } from '../app/store';
import React, { useEffect } from "react";

import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(function mount() {
    if (window.Cypress) {
      window.store = store
    }
  });
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
