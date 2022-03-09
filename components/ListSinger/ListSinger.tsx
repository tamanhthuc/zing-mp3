import ItemSinger from '../ItemSinger/ItemSinger';
import { Box, Grid } from '@mui/material';
import axios from '../../pages/api/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSingerModel } from '../../redux/actions/model';

export interface IListSingerProps {
  avatar: string;
  name: string;
  message: string;
  id: string;
  image: string;
  time: string;
  comments: string;
}

export default function ListSinger() {
  const dispatch = useDispatch();
  const [singerList, setSingerList] = useState<IListSingerProps[]>([]);

  const getData = async () => {
    const res = await axios.get('https://61d7f548e6744d0017ba8860.mockapi.io/singers');
    setSingerList(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSinger = (singerItem: any) => {
    console.log(singerItem);
    dispatch(setSingerModel(singerItem));
  };

  return (
    <Grid container spacing={1}>
      {singerList?.map((singerItem) => {
        return (
          <Grid item key={singerItem.id} lg={6} md={6} xs={6}>
            <Box onClick={() => handleSinger(singerItem)}>
              <ItemSinger singerItem={singerItem} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
