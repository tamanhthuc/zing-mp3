import Button from '../components/Button/Button';
import Chart from '../components/Chart/Chart';
import  IsongProps  from '../types/Song.type';
import { MainLayout } from '../components/layout';
import Top from '../components/Top/Top';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDataMusic } from '../redux/actions/music';

export interface IAppProps {}

export default function ZingChart() {
  const dispatch = useDispatch();
  
  const [data,setData] = useState<IsongProps[]>([]);
  const getData = async () => {
    try {
      const res = await axios.get('https://613dd94494dbd600172aba1a.mockapi.io/musics');
      dispatch(getDataMusic(res.data));
      setData((res.data))
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

 let getRanDomInt = (max: number) => {
   return Math.floor(Math.random() * max );
 } 
 let LengthData = getRanDomInt(data.length);
 let songNew = data?.find(data => data.id === LengthData.toString())
 const [model, setModel] = useState(true)
const handleClick = () => {
  setModel(false)
}
 
  return (
    <div className="zingchart">
      <Chart songNew={songNew}/>
      <div className={model ? 'zingchart__top100' : "zingchart__top100--active"}><Top data={data}/></div>
      {model && <Button name="Xem top 100" onClick={() => handleClick()}/>}
      <div className="zingchart__topWeek">

      </div>
    </div>
  );
}
ZingChart.Layout = MainLayout;
