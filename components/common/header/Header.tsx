import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../../context/ThemeContext';
import { isSignIn, setModelAgain } from '../../../redux/actions/model';
import { searchMusics } from '../../../redux/actions/music';
import { IRootState } from '../../../redux/reducers';
import { ROUTE_LIST } from '../Menu/routes';
import { ROUTE_LIST__BOTTOM } from '../Menu/routesBottom';
import CloseIcon from '@mui/icons-material/Close';


export default function Header() {
  const dispatch = useDispatch();
  const modelNow = useSelector((state: IRootState) => state.models.model);
  const [model, setModel] = useState(modelNow);
  const [isAvatar, setIsAvatar] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [nameUrl, setNameUrl] = useState(null);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('');
  const [isSearchIcon, setIsSearchIcon] = useState(false);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setBackgroundUrl('blue')
    setSearch(e.target.value);
    dispatch(searchMusics(search));
  };
  const handleModel = () => {
    // setModel(!model);
    dispatch(setModelAgain(!model));
  };
  useEffect(() => {
    if (modelNow) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [modelNow]);

  const router = useRouter();
  const value = useContext(ThemeContext);
  const { backgroundUrl, setBackgroundUrl }: any = value;
  const isSign = useSelector((state: IRootState) => state.models.isSign);

  const headerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    document.body.style.background = `${backgroundUrl}`;
    headerRef.current.style.background = `${backgroundUrl}`;
  }, [backgroundUrl]);

  const imageRef = useRef();
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(isSignIn(!!user));
      if (!user) {
        // user log out
        setIsAvatar(false);
        dispatch(isSignIn(false));
        setUserName('Đăng nhập');

        return;
      } else {
        dispatch(isSignIn(true));
        setIsAvatar(true);

        if (user && user.photoURL && user.displayName) {
          setAvatar(user.photoURL);
          setUserName(user.displayName);
        }
        console.log('user', user.photoURL);
        const token = await user.getIdToken();
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  const handleButton = () => {};

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

  const musicchanged = async (e: any) => {
    var music = e.target.files[0];
    var storagemRef = firebase.storage().ref('Music');
    const musicRef: any = storagemRef.child(music.name);
    await musicRef.put(music);
    setMusicUrl(musicRef.getDownloadURL());
    setNameUrl(music?.name);
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
      postData(musicUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicUrl]);

  const navRef = useRef<HTMLDivElement>(null);
  const overRef = useRef<HTMLDivElement>(null);
  const handleMenu = () => {
    navRef.current?.classList.toggle('header__nav--active');
    overRef.current?.classList.toggle('header__overlay--active');
  };

  const handleCancel = () => {
    navRef.current?.classList.toggle('header__nav--active');
    overRef.current?.classList.toggle('header__overlay--active');
  };

  const handleOverlay = () => {
    navRef.current?.classList.toggle('header__nav--active');
    overRef.current?.classList.toggle('header__overlay--active');
  };

  const handleLink = () => {
    navRef.current?.classList.toggle('header__nav--active');
    overRef.current?.classList.toggle('header__overlay--active');
  };

  const handleOutSign = () => {
    firebase.auth().signOut();
    router.push('/');
    navRef.current?.classList.toggle('header__nav--active');
    overRef.current?.classList.toggle('header__overlay--active');
  };

  const searchMobileRef = useRef<HTMLDivElement>(null);


  const handleSearch = () => {
    searchMobileRef.current?.classList.toggle('header__search--active');
    setIsSearchIcon(!isSearchIcon);
  };

  return (
    <>
      <div className="header" ref={headerRef}>
        <Box className="header__left">
          <ArrowBackIcon className="header__left__icon" onClick={() => router.back()} />
          <ArrowForwardIcon
            className="header__left__icon header__left__icon__right"
            onClick={() => router.reload()}
          />

          <div className="header__left__search">
            <SearchIcon className="header__left__search__icon" />

            <Box
              component="input"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              className="header__left__search__input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSearch(e)}
            />
          </div>
        </Box>

        <Box className="header__right">
          <Box>
            <Tooltip
              title="Chủ đề "
              sx={{ width: '40px', height: '40px', bgcolor: 'hsla(0,0%,100%,0.1)' }}
              arrow
            >
              <IconButton onClick={handleModel}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://png.pngtree.com/png-vector/20191028/ourmid/pngtree-shirt-icon-for-your-design-websites-and-projects-png-image_1888204.jpg"
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip
              title="Tải lên"
              arrow
              sx={{
                bgcolor: ' hsla(0,0%,100%,0.1)',
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                ml: '10px',
              }}
              onClick={handleClick}
            >
              <IconButton>
                <FileUploadIcon
                  sx={{
                    color: 'rgb(211,216,218)',
                  }}
                />
              </IconButton>
            </Tooltip>

            <input
              ref={hiddenFileInput}
              id="upload"
              type="file"
              name="upload"
              onChange={musicchanged}
              required
            />
          </Box>

          <Box>
            <Tooltip
              title="Cài đặt"
              arrow
              sx={{
                bgcolor: ' hsla(0,0%,100%,0.1)',
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                ml: '10px',
              }}
            >
              <IconButton>
                <SettingsIcon
                  sx={{
                    borderRadius: '50%',
                    color: 'rgb(211,216,218)',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ ml: '10px', cursor: 'pointer' }} onClick={handleButton}>
            <Link href="/sign-in" passHref>
              <Avatar sx={{}}>
                {isAvatar ? <Avatar alt="Remy Sharp" src={avatar} /> : <PersonOutlineIcon />}
              </Avatar>
            </Link>
          </Box>
        </Box>
      </div>

      <div className="header__mobile">
        <div className="header__mobile__menu" onClick={handleMenu}>
          <MenuIcon />
        </div>

        <div className="header__mobile__logo">
          <img src="https://static-zmp3.zadn.vn/skins/zmp3-v5.2/images/logo-mp-3.svg" />
        </div>

        <div className="header__mobile__icon">
          <div className="header__mobile__icon__search" onClick={handleSearch}>
            {isSearchIcon ? <CloseIcon /> : <SearchIcon />}
          </div>

          <div className="header__mobile__icon__person" onClick={handleMenu}>
            {isAvatar ? (
              <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 35, height: 35 }} />
            ) : (
              <PersonOutlineIcon />
            )}
          </div>
        </div>
      </div>
      <div className="header__search" ref={searchMobileRef}>
        <div className="header__search__wrap">
          <div className="header__search__icon">
            <SearchIcon />
          </div>
          <div className="header__search__input">
            <Box
              component="input"
              placeholder="Tìm kiếm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSearch(e)}
            />
          </div>
        </div>
      </div>

      <div className="header__nav" ref={navRef}>
        <div className="header__nav__signIn">
          <div className="header__nav__signIn--icon">
            <Link href="/sign-in" passHref>
              {isAvatar ? (
                <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 24, height: 24 }} />
              ) : (
                <PersonOutlineIcon />
              )}
            </Link>
          </div>
          <Link href="/sign-in" passHref>
            <div className="header__nav__signIn--name">{userName}</div>
          </Link>
        </div>
        {ROUTE_LIST.map((route, index) => (
          <Link key={route.id} href={route.path} passHref>
            <div className="header__nav__list" onClick={handleLink}>
              <div className="header__nav__list--icon">{route.icon}</div>
              <div className="header__nav__list--name">{route.label}</div>
            </div>
          </Link>
        ))}
        {ROUTE_LIST__BOTTOM.map((route, index) => (
          <Link key={route.id} href={route.path} passHref>
            <div className="header__nav__list" onClick={handleLink}>
              <div className="header__nav__list--icon">{route.icon}</div>
              <div className="header__nav__list--name">{route.label}</div>
            </div>
          </Link>
        ))}

        {isSign && (
          <div className="header__nav__list" onClick={handleOutSign}>
            <div className="header__nav__list--icon">
              <ExitToAppIcon />
            </div>
            <div className="header__nav__list--name">Đăng xuất</div>
          </div>
        )}

        <div className="header__nav__cancel" onClick={handleCancel}>
          <CloseIcon />
        </div>
      </div>
      <div className="header__overlay" onClick={handleOverlay} ref={overRef}></div>
    </>
  );
}
