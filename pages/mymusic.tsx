import Button from '../components/Button/Button';
import { MainLayout } from '../components/layout';
import ListUpLoad from '../components/ListUpload/ListUpLoad';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Link } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upLoadMusic } from '../redux/actions/music';
import { IRootState } from '../redux/reducers';
import { toast } from 'react-toastify';

interface IsongProps {
  name: string;
  image: string;
  song: string;
  singer: string;
  id: string;
}
// const storage = firebase.storage();

export default function MyMusic() {
  const isSign = useSelector((state: IRootState) => state.models.isSign);
  const info = firebase.auth().currentUser;
  console.log('infoUrl', info?.photoURL);
  const [songs, setSongs] = useState('');

  const [fileUrl, setFileUrl] = useState(null);
  const [musicUrl, setMusicUrl] = useState('');
  const [nameUrl, setNameUrl] = useState(null);
  const [disable, setDisable] = useState(true);
  const [musics, setMusics] = useState<IsongProps[]>([]);
  const [isSignOut, setIsSignOut] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (musicUrl !== null) {
  //     alert('add music success');
  //   }
  // }, [musicUrl]);

  const musicchanged = async (e: any) => {
    var music = e.target.files[0];
    var storagemRef = firebase.storage().ref('Music');
    const musicRef: any = storagemRef.child(music.name);
    await musicRef.put(music);
    setMusicUrl(musicRef.getDownloadURL());
    setNameUrl(music?.name);
    toast.success('Add Music sucess');
  };

  const postData = async (url: string) => {
    const res = await axios.post('https://61b2a056c8d4640017aaf455.mockapi.io/upload', {
      song: url,
      image: 'https://avatar-ex-swe.nixcdn.com/song/share/2020/06/16/f/e/3/b/1592301772778.jpg',
    });

    return res;
  };

  useEffect(() => {
    if (musicUrl) {
      postData(musicUrl).then((response) => {
        const { data } = response;
        const cloneMusic = [...musics];
        cloneMusic.push(data);
        setMusics(cloneMusic);
      });
    }
  }, [musicUrl, nameUrl]);

  const getDataUpload = async () => {
    try {
      const res = await axios.get('https://61b2a056c8d4640017aaf455.mockapi.io/upload');
      setMusics(res.data);
      dispatch(upLoadMusic(res.data));
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getDataUpload();
  }, []);

  const handleSignOut = () => {
    setIsSignOut(!isSignOut);
  };

  const router = useRouter();
  const handleAccount = () => {
    firebase.auth().signOut();
    router.push('/');
  };

  const handleDelete = (id: string) => {
    console.log('id', id);
    axios.delete(`https://61b2a056c8d4640017aaf455.mockapi.io/upload/${id}`).then((res) => {
      console.log('res', res);
      console.log(res.data);
      getDataUpload();
    });

    toast.success('Remove Notification !');
  };

  if (isSign) {
    return (
      <>
        <Box className="mymusic">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            {info && info.photoURL && (
              <Avatar alt="Thuc" src={info.photoURL} sx={{width: 60, height: 60, mt: 5}} />
            )}
          </Box>

          <Box
            sx={{
              color: '#fff',
              fontSize: '30px',
              fontWeight: '600',
              mt: '10px',
              textAlign: 'center',
            }}
          >
            {info?.displayName}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              right: '0',
              top: '0',
              display: 'flex',
              fontSize: '12px',
              mr: '20px',
            }}
          >
            <Box >
              <Button name="NÂNG CẤP VIP" />
            </Box>
            <Box sx={{ ml: '15px' }}>
              <Button name="NHẬN CODE VIP" />
            </Box>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                bgcolor: 'hsla(0,0%,100%,0.1)',
                color: '#fff',
                fontSize: '18px',
                borderRadius: '50%',
                position: 'relative',
                ml: '15px',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '40%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                onClick={handleSignOut}
              >
                ...
              </Box>
            </Box>
          </Box>
          {isSignOut && (
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                color: '#fff',
                right: '2%',
                top: '12%',
                width: '200px',
                height: '50px',
                bgcolor: ' rgba(67, 34, 117, 1)',

                borderRadius: '15px',
                pl: '10px',
                alignItems: 'center',
                py: '5px',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: ' hsla(0,0%,100%,0.1)',
                },
              }}
              onClick={handleAccount}
            >
              <Box sx={{ mr: '15px', opacity: '0.8' }}>
                <ExitToAppIcon />
              </Box>
              <Box sx={{ opacity: '0.8' }}>Đăng xuất</Box>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              mt: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-around',
                width: '450px',
                bgcolor: 'hsla(0,0%,100%,0.1)',
                borderRadius: '20px',
                py: '5px',
                mt: '30px',
                px: '5px',
              }}
            >
              <Box sx={{ color: '#fff', fontSize: '14px', cursor: 'pointer' }}>TỔNG QUAN</Box>
              <Box sx={{ color: '#fff', fontSize: '14px', cursor: 'pointer' }}>BÀI HÁT</Box>
              <Box sx={{ color: '#fff', fontSize: '14px', cursor: 'pointer' }}>PLAYLSIT</Box>
              <Box sx={{ color: '#fff', fontSize: '14px', cursor: 'pointer' }}>PODCAST</Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              ml: '40px',
              mt: '30px',
              mr: '20px',
            }}
          >
            <Box sx={{ fontSize: '20px', fontWeight: '500', color: '#fff' }}>Danh sách tải lên</Box>
            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
              <Box
                sx={{
                  ml: '5px',
                  width: '100px',
                  height: '35px',
                  bgcolor: 'hsla(0,0%,100%,0.1)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  lineHeight: '35px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <label htmlFor="upload" className="">
                  Tải lên
                </label>
                <input id="upload" type="file" name="music" onChange={musicchanged} required />
              </Box>
              <Box
                sx={{
                  ml: '10px',
                  width: '140px',
                  height: '35px',
                  bgcolor: 'rgba(67, 34, 117, 1)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  lineHeight: '35px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Phát tất cả
              </Box>
            </Box>
          </Box>
          <Box sx={{ ml: '40px', mt: '20px', mb: '100px' }}>
            <ListUpLoad musics={musics} onDelete={handleDelete} />
          </Box>
        </Box>

        <div className="mymusic__mobile">
          <div className="mymusic__mobile__tile">
            Để sử dụng tất cả các tính năng, bạn vui lòng sử dụng ứng dụng Zing MP3
          </div>

          <a className="mymusic__mobile__button" href='https://apps.apple.com/VN/app/id992357547?mt=8'>
                <img src="https://static-zmp3.zadn.vn/skins/zmp3-mobile-v5.2/images/logo-mp-3.png" alt="" />

                <div className="mymusic__mobile__button__name">Mở Zing MP3</div>
          </a>
        </div>
      </>
    );
  }
  return <Box>Ban phai dang nhap</Box>;
}

MyMusic.Layout = MainLayout;
