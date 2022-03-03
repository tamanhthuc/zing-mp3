import  IsongProps  from '../../types/Song.type';
import MusicItem from '../MusicItem/MusicItem';
import React from 'react';



interface IDataProps {
  data: IsongProps[]
}

export default function Top({data} : IDataProps) {

  return (
    <>
      {data.map((music, index) => {
        return <MusicItem music={music} index={index} key={music.id}  />;
      })}

  
    </>
  );
}
