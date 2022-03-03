import '../components/Button/Button.scss';
import '../components/Chart/Chart.scss';
import '../components/common/BassMusic/bassmusic.scss';
import '../components/common/header/Header.scss';
import '../components/common/ListMusic/listmusic.scss';
import '../components/common/Menu/Menu.scss';
import '../components/common/PlayList/playlist.scss';
import '../components/common/Song/Song.scss';
import { EmptyLayout } from '../components/layout';
import '../components/layout/main.scss';
import '../components/ModelSinger/ModelSinger.scss';
import '../components/ModelTheme/ModelTheme.scss';
import '../components/ModelTheme/themeItem.scss';
import '../components/MusicItem/musicitem.scss';
import '../components/Search/Search.scss';
import '../components/slider/Slider.scss';
import '../components/Top/Top.scss';
import '../components/WatchMore/watchmore.scss';
import { CacheProvider } from '@emotion/react';
import { AppPropsWithLayout } from '../models/common';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider1 } from '../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import Head from 'next/head';
import React from 'react';
import 'swiper/css';
import { wrapper } from '../redux/store';
import '../styles/globals.scss';
import '../styles/zingchart/zingchart.scss';
import 'react-toastify/dist/ReactToastify.css';
import { createEmotionCache, theme } from '../utils/index';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Layout = Component.Layout ?? EmptyLayout;
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider1>
      
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout> 
          <ToastContainer />
        </ThemeProvider>
        
      </ThemeProvider1>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
