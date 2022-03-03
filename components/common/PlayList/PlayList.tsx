import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box } from '@mui/system';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRunning } from '../../../redux/actions/music';
import { removeListenedPlaylists, removeYourPlaylists, setOpenPlaylists } from '../../../redux/actions/playlists';
import { IRootState } from '../../../redux/reducers';
import { ThemeContext } from '../../../context/ThemeContext';
import { IsongProps } from '../ListMusic/ListMusic';


function PlayList() {
  const dispatch = useDispatch();
  const isOpenPlaylists = useSelector((state: IRootState) => state.playlists.isOpen);

  const stylePlaylists = {
    right: isOpenPlaylists ? 0 : '-100%',
  };
  const yourPlaylists = useSelector((state: IRootState) => state.playlists.yourPlaylists);
  const listenedPlaylists = useSelector((state: IRootState) => state.playlists.listenedPlaylists);
  const runningMusic = useSelector((state : IRootState) => state.music.runningMusic);
  
  const [playlistsType, setPlaylistsType] = useState(yourPlaylists);
  const [isPlaylists, setIsPlaylists] = useState(true);
  const [currentMusic, setCurrentMusic] = useState<IsongProps[]>([]);
  useEffect(() => {
    if (isPlaylists) {
      setPlaylistsType(yourPlaylists);
    } else {
      setPlaylistsType(listenedPlaylists);
    }
  }, [yourPlaylists, listenedPlaylists, isPlaylists]);

  useEffect(() => {
    if (runningMusic.length !== 0) {
      setCurrentMusic(runningMusic);
    }
  }, [currentMusic, runningMusic]);

  const activeClass = (id: string) => {
    if (currentMusic.length !== 0) {
      const current = currentMusic[0];
      if (current.id === id) {
        return 'playlist__list__item playlist__list__item--active';
      }
    }
    return 'playlist__list__item';
  };

  const handleRunning = (music: IsongProps) => {
    dispatch(setRunning(music));
  };

  const handleClosePlaylist = () => {
    dispatch(setOpenPlaylists(false));
  };


  const value = useContext(ThemeContext);
  const {backgroundUrl, setBackgroundUrl}:any = value;

  const playlistRef =useRef<HTMLDivElement>(null!)
  useEffect(() => {
    playlistRef.current.style.background = backgroundUrl
  }, [backgroundUrl])


  const removeMusic = (music: IsongProps) => {
    if (isPlaylists) {
      dispatch(removeYourPlaylists(music));
    }else {
      dispatch(removeListenedPlaylists(music));
    }
    
  };

  return (
    <div className="playlist" style={stylePlaylists} ref={playlistRef}>
      <Box className="playlist__header">
        <Box className="playlist__header__title">
          <Box
            className={
              isPlaylists
                ? 'playlist__header__title__name-playlists playlist__header__title__name--active'
                : 'playlist__header__title__name-playlists'
            }
            onClick={() => setIsPlaylists(true)}
          >
            Danh sách phát
          </Box>
          <Box
            className={
              isPlaylists
                ? 'playlist__header__title__name-current'
                : 'playlist__header__title__name-current playlist__header__title__name--active'
            }
            onClick={() => setIsPlaylists(false)}
          >
            Nghe gần đây
          </Box>
        </Box>

        <AccessAlarmIcon className="playlist__header__icon" />
        <Box className="playlist__header__loadmore">
          <span onClick={handleClosePlaylist}>x</span>
          <div className="playlist__header__loadmore__detail">Đóng</div>
        </Box>
      </Box>

      <Box className="playlist__body">
        <ul className="playlist__list">
          {playlistsType.map((music) => {
            return (
              <li key={music.id} className={activeClass(music.id)}>
                <div className="playlist__list__item__detail" onClick={() => handleRunning(music)}>
                  <Box
                    component="img"
                    className="playlist__list__item__detail__img"
                    src={music.image}
                    alt=""
                  />
                  <Box className="playlist__list__item__detail__info">
                    <Box className="playlist__list__item__detail__info__name">{music.name}</Box>
                    <Box className="playlist__list__item__detail__info__singer">{music.singer}</Box>
                  </Box>
                </div>

                <div className="playlist__list__item__action" onClick={() => removeMusic(music)}>
                  <span >x</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Box>
    </div>
  );
}

export default memo(PlayList)
