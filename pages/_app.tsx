import React from 'react';
import { OfflineProvider, OfflineContext, GeolocationProvider } from '../context';
import { AppProps, AppContext } from 'next/app';
import '../styles/index.css';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const { addListeners, handleConnectionChange } = React.useContext(OfflineContext);

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

App.getInitialProps = async (appContext: AppContext) => {
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
  };
};

const AppComponent = (props) => (
  <GeolocationProvider>
    <OfflineProvider>
      <App {...props} />
    </OfflineProvider>
  </GeolocationProvider>
);

export default AppComponent;
