import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../components/layout';
import MusicItem from '../components/MusicItem/MusicItem';
import { API_MUSIC } from '../contants/Global.contant';
import { getDataMusic } from '../redux/actions/music';
import IsongProps from '../types/Song.type';

export default function Top100() {

  const dispatch = useDispatch();
  const [musics, setMusics] = useState<IsongProps[]>([]);
 
  const getData = async () => {
    try {
      const res = await axios.get(`${API_MUSIC}`);
      setMusics(res.data);
      dispatch(getDataMusic(res.data));
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="topMusic">
      <div className="topMusic__table">
        <div className="topMusic__table__heading">Bảng xếp hạng</div>
        {musics?.map((music, index) => {
          return <MusicItem music={music} index={index} key={music?.id} />;
        })}
      </div>
    </div>
  );
}
Top100.Layout = MainLayout;
