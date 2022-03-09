import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { ModelContext } from '../../../context/ModelContext';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/reducers';
import ItemMusic from './ItemMusic';

export interface IsongProps {
  id: string;
  image: string;
  isRunning?: boolean;
  isYourPlaylists?: boolean;
  mvSong?: string;
  name: string;
  singer: string;
  song: string;
  viewed?: number;
  isMoreActive?: boolean;
  overlay?: boolean;
}

export interface IModelContext {
  lists: IsongProps[];
  setLists?: () => void;
}

export default function ListMusic() {
  const runningMusic = useSelector((state: IRootState) => state.music.runningMusic);
  const value = useContext(ModelContext);
  const { lists, setLists }: any = value;

  const handeMoreMenu = (id: string) => {
    setLists((oldList: any) =>
      [...oldList]?.map((item) => {
        const { content } = item;

        return {
          ...item,
          content: content?.map((song: any) => {
            if (song.id === id) {
              return {
                ...song,
                isMoreActive: !song.isMoreActive,
              };
            }
            return {
              ...song,
              isMoreActive: false,
            };
          }),
        };
      })
    );
  };

  const handeOverlay = (id: string) => {
    setLists((oldList: any) =>
      [...oldList]?.map((item) => {
        const { content } = item;

        return {
          ...item,
          content: content?.map((song: any) => {
            if (song.id === id) {
              return {
                ...song,
                overlay: true,
              };
            }
            return {
              ...song,
              overlay: false,
            };
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (runningMusic.length > 0) {
      handeOverlay(runningMusic[0].id);
    }
  }, [runningMusic]);

  return (
    <>
      {lists.length !== 0 ? (
        <Box className="list__music">
          {(lists || [])?.map((list: any) => {
            return (
              <Box className="list__music__item" key={list.id}>
                <Box className="list__music__item__title">{list.name}</Box>
                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {(list?.content || []).slice(3, 11).map((song: IsongProps) => {
                    return (
                      <Grid item xs={6}  lg={2} sm={3} key={song.id}>
                        <ItemMusic
                          handeMoreMenu={handeMoreMenu}
                          more={song.isMoreActive}
                          newSong={song}
                          overlay={song.overlay}
                          handeOverlay={handeOverlay}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
