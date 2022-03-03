import Header from '../common/header/Header';
import  IsongProps  from '../../types/Song.type';
import Menu from '../common/Menu/Menu';
import PlayList from '../common/PlayList/PlayList';
import Song from '../common/Song/Song';
import ModelSinger from '../ModelSinger/ModelSinger';
import ModelSlider from '../ModelSlider/ModelSlider';
import ModelTheme from '../ModelTheme/ModelTheme';
import Search from '../Search/Search';
import { LayoutProps } from '../../models';
import { Box } from '@mui/system';
import { ModelProvider } from '../../context/ModelContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import API_URL from '../../pages/api/axios/apiUrl';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModelAgain, setSingerModel, setSongModel } from '../../redux/actions/model';
import { setRunning } from '../../redux/actions/music';
import { IRootState } from '../../redux/reducers';
import musicService from '../../service/musicService';
import { ThemeContext } from '../../context/ThemeContext';



const config = {
  apiKey: 'AIzaSyBLR4nRVuEodf0_cWP4HerFqU6RXyx49Q0',
  authDomain: 'zingmp3-7c0d9.firebaseapp.com',
  databaseURL: 'https://zingmp3-7c0d9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'zingmp3-7c0d9',
  storageBucket: 'zingmp3-7c0d9.appspot.com',
  messagingSenderId: '735457854755',
  appId: '1:735457854755:web:e80dfc673803fd62d47896',
  measurementId: 'G-29D28ZEXNC',
};
firebase.initializeApp(config);

export type MusicListProps = {
  lists: {
    name: string;
    content: [];
    image: string;
  }[];
};
export function MainLayout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState<IsongProps[]>([]);
  const runningMusic = useSelector((state: IRootState) => state.music.runningMusic);
  const yourPlaylists = useSelector((state: IRootState) => state.playlists.yourPlaylists);
  const searchMusics = useSelector((state: IRootState) => state.music.searchMusic);
  const modelNow = useSelector((state: IRootState) => state.models.model);
  const dataMusic = useSelector((state: IRootState) => state.music.musics);
  const [lists, setLists] = useState<MusicListProps[] | []>([]);
  const songModel = useSelector((state: IRootState) => state.models.songModel);
  const singerModel = useSelector((state:IRootState) => state.models.singerModel);
 
  const songRef = useRef<HTMLImageElement>(null);
  // const getListMusic = async () => {
  //   const res: any = await musicService.getList(API_URL.music.getList());
  //   setLists(res);
  // };

  // useEffect(() => {
  //   getListMusic();
  // }, []);

  const next = useSelector((state: IRootState) => state.music.next);

  const nextMusic = useMemo(() => {
    return dataMusic.find((data: any) => data.id === next.toString());
  }, [next]);

  let indexRunning = Number(runningMusic[0]?.id);

  useEffect(() => {
    if (runningMusic.length > 0) {
      setTracks(runningMusic);
    }
    if (next > indexRunning) {
      setTracks([nextMusic]);
      dispatch(setRunning(nextMusic));
    }
    if (next < indexRunning && next > 0) {
      setTracks([nextMusic]);
      dispatch(setRunning(nextMusic));
    }
  }, [runningMusic, yourPlaylists, next]);

  const setTrackSong = () => {
    if (tracks) {
      if (tracks.length > 0) {
        return <Song tracks={tracks} />;
      } else return '';
    }
  };
  const styleDivSong = {
    bottom: tracks.length !== 0 ? 0 : '-100%',
  };
  const value = useContext(ThemeContext);
  const { backgroundUrl, setBackgroundUrl }: any = value;
  useEffect(() => {
    if (songRef.current){

      songRef.current.style.background = backgroundUrl;
    }
  }, [backgroundUrl]);

  useEffect(() => {
    if (songModel?.id > 0 ) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [songModel,singerModel]);

  return (
    <ModelProvider>
      <Box className="App">
        <Box className="container">
          <Box className="div__menu">
            {/* <Menu /> */}
          </Box>

          <Box className="div__mainPage">
            <Header />
            {/* {searchMusics.length === 0 ? <Box>{children}</Box> : <Search />} */}
          </Box>

          <Box className="div__playlist">
            {/* <PlayList /> */}
          </Box>

          <Box className="div__song" ref={songRef} style={styleDivSong}>
            {/* {setTrackSong()} */}
          </Box>
        </Box>

        {/* {modelNow && (
          <Box className="div__model" onClick={() => dispatch(setModelAgain(false))}>
            <ModelTheme />
          </Box>
        )} */}

        {/* {songModel?.id > 0 && (
          <div className="">
            <div
              className="model__slider"
              onClick={() =>
                dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }))
              }
            >
              <ModelSlider songModel={songModel} />
            </div>
          </div>
        )} */}

        {/* {singerModel?.id > 0 && (
          <Box
            sx={{
              position: 'fixed',
              top: '0',
              right: '0',
              left: '0',
              bottom: '0',
              width: "100%",
              height: "100%",
              bgcolor: 'rgba(0,0,0,0.8)',
              zIndex: '9999',
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}
            onClick={() => dispatch(setSingerModel({name: "", id: "", image:"", avatar: "", message: "", time: ""}))}
          >
            <ModelSinger singerModel={singerModel} />
          </Box>
        )} */}
      </Box>
    </ModelProvider>
  );
}
