import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setSongModel } from '../../redux/actions/model';
import { Pagination, Autoplay} from 'swiper';
const lists = [
  {
    image: 'https://photo-zmp3.zadn.vn/banner/2/4/b/c/24bc227b35af337e66f0b9f25bc6487b.jpg',
    name: 'Thương em đến già',
    singer: 'Lê Bảo Bình',
    song: 'https://firebasestorage.googleapis.com/v0/b/zingmp3-7c0d9.appspot.com/o/MotThoiDaXaMoodshowThe2ndShow-BaoAnh-7120393.mp3?alt=media&token=efdbcb74-d8a1-4bc1-9a66-bbf21f398ba6',
    key: 'first',
    id: '1',
  },
  {
    image: 'https://photo-zmp3.zadn.vn/banner/b/2/c/4/b2c4e0bf1a5b7ff71fb1e8428324691b.jpg',

    name: 'Cục cưng ơi',
    singer: 'H2K, YuniBoo',
    song: 'https://firebasestorage.googleapis.com/v0/b/zingmp3-7c0d9.appspot.com/o/ThucGiac-DaLAB-7048212.mp3?alt=media&token=b1a824da-46c5-4dae-933b-c08cabecdb62',
    key: 'second',
    id: '2',
  },
  {
    image: 'https://photo-zmp3.zadn.vn/banner/b/f/5/f/bf5fdeea290b87676454a1979211c231.jpg',
    name: 'Về (Đi Để Trở Về 6)',
    singer: 'Phan Mạnh Quỳnh',
    song: 'https://firebasestorage.googleapis.com/v0/b/zingmp3-7c0d9.appspot.com/o/ChimQuyTrongLong-KICMVanMaiHuong-7047049.mp3?alt=media&token=c51e85b3-8a58-4063-8340-c9e03512e82f',
    key: 'last',
    id: '3',
  },
];
export default function Slider() {
  const dispatch = useDispatch();

  const handleSlider = (item: any) => {
    dispatch(setSongModel(item));
  };

  return (
    <>
      <Box className="slider">
        <Grid container spacing={2}>
          {lists.map((item, idx) => {
            return (
              <Grid item xs={6} md={4} sm={6} key={idx}>
                <Box onClick={() => handleSlider(item)}>
                  <Box
                    component="img"
                    src={item.image}
                    className={`slider__img slider__img__${item.key}`}
                  ></Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <div className="slider__mobile">
        <Swiper pagination={true} autoplay={true} modules={[Pagination,Autoplay]} className="mySwiper">
          {lists.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div onClick={() => handleSlider(item)}>
                  <img src={item.image} alt=""></img>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
