import React from 'react';
import { AppProps, AppContext } from 'next/app';
import { Provider, connect } from 'react-redux';
import store from '../store';
import Head from 'next/head';
import { AppState } from 'app';
import { addListeners, handleConnectionChange } from '../store/modules/offline';
import '../styles/index.css';

const AppPage = (props: AppProps & ConnectedProps) => {
  const { Component, pageProps, handleConnectionChange, addListeners } = props;

  React.useEffect(() => {
    handleConnectionChange(), addListeners();
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>

        <link rel='apple-touch-icon' sizes='120x120' href='site-icons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='site-icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='site-icons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='site-icons/safari-pinned-tab.svg' color='#2680c2' />
        <meta name='msapplication-TileColor' content='#2d89ef' />
        <meta name='theme-color' content='#f0f4f8' />
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1' />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

AppPage.getInitialProps = async (appContext: AppContext) => {
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
  };
};

const mapStateToProps = ({ offline }: AppState) => {
  return {
    offline,
  };
};

const actions = { handleConnectionChange, addListeners };

type ConnectedProps = typeof actions & ReturnType<typeof mapStateToProps>;

const App = connect(mapStateToProps, actions)(AppPage);

const AppComponent = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

export default AppComponent;
