import API_URL from '../pages/api/axios/apiUrl';
import  musicService  from '../service/musicService';

import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
export interface IsongProps {
  id: string;
  image: string;
  isRunning: boolean;
  isYourPlaylists: boolean;
  mvSong: string;
  name: string;
  singer: string;
  song: string;
  viewed: number;
  isMoreActive: boolean;
  overlay: boolean;
}
interface MusicListProps {
  name: string;
  content?: IsongProps[];
  id: string;
  isMoreActive?: boolean
}

const ModelContext = createContext({});

function ModelProvider({ children }: any) {
  const [lists, setLists] = useState<MusicListProps[]>([]);
  const getListMusic = async () => {
    const res: any = await musicService.getList(API_URL.music.getList());
    setLists(res);
  };

  useEffect(() => {
    getListMusic();
  }, []);

  return (
    <ModelContext.Provider value={{lists, setLists}}>
      {children}
    </ModelContext.Provider>
  );
};

export { ModelContext, ModelProvider };
