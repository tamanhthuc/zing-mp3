import MainPage from '../components/common/mainPage/MainPage';
import { MainLayout } from '../components/layout';
import { Box } from '@mui/system';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDataMusic } from '../redux/actions/music';

const Home = () => {
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const res = await axios.get('https://613dd94494dbd600172aba1a.mockapi.io/musics');
      dispatch(getDataMusic(res.data));
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getData();
  },[]);
 
  return (
    // <ModelProvider>
    <Box className="App">
      <Head>
        <title>zingmp3</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>
        <MainPage />
      </Box>
    
    </Box>
    // </ModelProvider>
  );
};
Home.Layout = MainLayout;



export default Home;
