import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoopIcon from '@mui/icons-material/Loop';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Tooltip } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import { ModelContext } from '../../../context/ModelContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isRunning, Next } from '../../../redux/actions/music';
import { addYourPlaylists, listenedPlaylists, setOpenPlaylists } from '../../../redux/actions/playlists';
import { IRootState } from '../../../redux/reducers';
import { IsongProps } from '../ListMusic/ListMusic';
interface IMusicProps {
  tracks: IsongProps[];
}

export default function Song({ tracks }: IMusicProps) {
 
  const dispatch = useDispatch();
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState<number | any>(100);
  const { name, song, image, singer } = tracks?.[trackIndex];
  const [isHoverProgress, setIsHoverProgress] = useState(false);
  const [onLoop, setOnLoop] = useState(false);
  const [onShuffle, setOnShuffle] = useState(false);
  const isRunningMusic = useSelector((state: IRootState) => state.music.isRunning);

  const openPlayList = useSelector<IRootState>((state) => state.playlists.isOpen);
  const queueRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isRunningMusic);
  
  const audioRef = useRef(new Audio(song));
  audioRef.current.volume = volume / 100;
  const intervalRef: {
    current: NodeJS.Timeout | null | number;
  } = useRef(null);
  const isReady = useRef(false);
  const { duration } = audioRef.current;

  const handleOpenPlaylists = () => {
    dispatch(setOpenPlaylists(!openPlayList));
  
  };

  const [volumeOld, setVolumeOld] = useState<Number>(100);

  
  const handleChange = (e: Event, newValue: number | number[]) => {
    setVolume(newValue);
    audioRef.current.volume = volume / 100;
    setVolumeOld(volume)
  };
 
  const handleSlider = () => {
    setVolumeOld(volume)
  }
  
  const startTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (onLoop) {
          audioRef.current.play();
        } else {
          toNextTrack();
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: any) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      dispatch(isRunning(isPlaying));
      dispatch(listenedPlaylists(tracks[trackIndex]));
      startTimer();
      
    } else {
      audioRef.current.pause();
      dispatch(isRunning(isPlaying));
    }
  }, [isPlaying, audioRef, song, isRunningMusic, trackIndex, trackProgress]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(song);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      startTimer();
      dispatch(Next(0));
    } else {
      isReady.current = true;
    }
  }, [song, audioRef, trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  let defaultTrack =
    Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60) < 10
      ? `0${Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60)}`
      : `${Math.floor(trackProgress - Math.floor(trackProgress / 60) * 60)}`;
  let timeAfter = Math.floor(duration - Math.floor(duration / 60) * 60)

  const toNextTrack = () => {
    dispatch(Next(Number(tracks[0]?.id) + 1));
  };


  const toPreTrack = () => {
    dispatch(Next(Number(tracks[0]?.id) > 0 ? Number(tracks[0]?.id) - 1 : Number(tracks[0]?.id)));
  };

  const handleAddPlaylists = (song: object) => {
    dispatch(addYourPlaylists(song));
  };

  const value= useContext(ModelContext);
  
  return (
    <>
      {tracks.length !== 0 ? (
        <Box className="song">
          <Box className="song__info">
            <Box className="song__info__singer">
              <Box
                className={
                  isPlaying ? 'img__rotation song__info__singer__img' : ' song__info__singer__img'
                }
                component="img"
                src={image}
              ></Box>

              <Box className="song__info__singer__detail">
                <Box className="song__info__singer__detail__name">{name}</Box>
                <Box className="song__info__singer__detail__name-singer">{singer}</Box>
              </Box>

              <Box className="song__info__heart">
                <Tooltip title="Thêm vào thư viện" arrow>
                  <IconButton>
                    <FavoriteBorderIcon
                      sx={{
                        color: 'rgb(211,216,218)',
                        transform: 'scale(0.8)',
                      }}
                      onClick={() => handleAddPlaylists(tracks[0])}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box className="song__info__loadmore" sx={{ ml: '10px' }}>
              <Tooltip title="xem thêm" arrow>
                <Box
                  sx={{
                    position: 'relative',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    
                  }}
                >
                  <IconButton>
                    <Box
                      sx={{
                        color: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: ' translate(-50%, -50%)',
                      
                      }}
                    >
                      ...
                    </Box>
                  </IconButton>
                </Box>
              </Tooltip>
            </Box>
          </Box>

          <Box className="song__controls">
            <Box className="song__controls__icons">
              <ShuffleIcon
                className={
                  onShuffle
                    ? 'song__controls__icon song__controls__icon--active  song__controls-icon-border'
                    : 'song__controls__icon song__controls-icon-border'
                }
                onClick={() => setOnShuffle(!onShuffle)}
              />
              <FastRewindIcon
                className="song__controls__icon-border song__controls__icon"
                onClick={toPreTrack}
              />
              {isPlaying ? (
                <div className="active">
                  <PauseIcon
                    className="song__controls__icon song__controls__icon--play"
                    onClick={() => setIsPlaying(!isPlaying)}
                  />
                </div>
              ) : (
                <div className="active">
                  <PlayArrowIcon
                    className=" song__controls__icon song__controls__icon--pause"
                    onClick={() => setIsPlaying(!isPlaying)}
                  />
                </div>
              )}
              <FastForwardIcon
                className="song__controls__icon song__controls__icon-border"
                onClick={toNextTrack}
              />
              <LoopIcon
                className={
                  onLoop
                    ? 'song__controls__icon song__controls__icon--active song__controls-icon-border'
                    : 'song__controls__icon song__controls__icon'
                }
                onClick={() => setOnLoop(!onLoop)}
              />
            </Box>

            <Box className="song__controls__time">
              <Box className="song__controls__time-progress">
                0{Math.floor(trackProgress / 60)}:{`${defaultTrack}`}
              </Box>
              {isHoverProgress === true ? (
                <input
                  type="range"
                  value={trackProgress}
                  min="0"
                  step="1"
                  max={duration ? duration : 0}
                  className="progress"
                  style={{ width: '400px', height: '10px', cursor: 'pointer' }}
                  onMouseLeave={() => setIsHoverProgress(false)}
                  onChange={(e) => onScrub(e.target.value)}
                />
              ) : (
                <Box sx={{ width: '400px', height: '10px' }} className="box__progress">
                  <LinearProgress
                    color="inherit"
                    sx={{ color: 'secondary.main', width: '100%', cursor: 'pointer' }}
                    onMouseEnter={() => setIsHoverProgress(true)}
                    variant="determinate"
                    valueBuffer={100}
                    value={(trackProgress / duration) * 100}
                    className="progress__default"
                  />
                </Box>
              )}

              {duration ? (
                <Box className="song__controls__time__end">
                  0{Math.floor(duration / 60)}: 
                  { timeAfter === 0 ? '00' : timeAfter}
                </Box>
              ) : (
                <Box className="song__controsl__time__end">00:00</Box>
              )}
            </Box>
          </Box>

          <Box className="song__action">
            <Box className="song__action__left">
              <VideoLibraryIcon  className="song__action__left__icon song__action__left__icon-mv" />
              <MicExternalOnIcon className="song__action__left__icon song__action__left__icon-mic" />
              {volume === 0 ? (
                <VolumeOffIcon className="song__action__left__icon" onClick={() => setVolume(volumeOld > 0 ? volumeOld : 50  )} />
              ) : (
                <VolumeUpIcon className="song__action__left__icon" onClick={() => setVolume(0)} />
              )}
              <Slider
                color="secondary"
                size="small"
                aria-label="Volume"
                value={volume}
                className="volume__slider"
                onChange={handleChange}
               onClick={handleSlider}
              />  
            </Box>

            <Box className="song__action__separate ">|</Box>

            <QueueMusicIcon
              className="song__action-icon song__action__listPlay"
              onClick={handleOpenPlaylists}
            ref={queueRef}
            />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
