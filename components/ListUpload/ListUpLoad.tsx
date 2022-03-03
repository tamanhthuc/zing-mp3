import MusicItem from '../MusicItem/MusicItem';
import React from 'react';

interface songProps {
  name: string;
  image:string;
  song:string;
  singer: string;
  id: string;
 };


interface Musicprops {
  musics:songProps[];
  onDelete : (id: string) => void
}

export default function ListUpLoad({ musics,onDelete }: Musicprops) {
    
  //   const musics = useSelector((state: IRootState) => state.music.uploadMuiscs);
  //   console.log("musics", musics)
  // const handleMore = (id: string) => {
  //   setMusics((oldList) => {
  //     [...oldList].map((music) => {
  //       if (music.id === id) {
  //         return {
  //           ...music,
  //           overlay: true,
  //         };
  //       }
  //       return {
  //         ...music,
  //         overlay: false,
  //       };
  //     });
  //   });
  // };
  return (
    <div className="upload__list">
      {musics?.map((music) => {
        return <MusicItem music={music} index={Number(music.id)} key={music.id} onDelete={onDelete} />;
      })}
    </div>
  );
}
