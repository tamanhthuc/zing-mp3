import  IsongProps  from '../../types/Song.type';
import { AnyAction } from 'redux';

interface initialProps {
  runningMusic: IsongProps[];
  musics: [];
  searchMusic: IsongProps[];
  isRunning: boolean;
  next: number;
  uploadMuiscs: [];
}

const initialState: initialProps = {
  runningMusic: [],
  musics: [],
  searchMusic: [],
  isRunning: false,
  uploadMuiscs: [],
  next: 0,
};

const musicReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_RUNNING': {
      const newRunningMusic = [...state.runningMusic];
      newRunningMusic.splice(0, state.runningMusic.length);
      newRunningMusic.push(action.payload);
      return {
        ...state,
        runningMusic: newRunningMusic,
      };
    }
    case 'GET_DATA_MUSICS': {
      return {
        ...state,
        musics: action.payload,
      };
    }

    case 'IS_RUNNING': {
      return {
        ...state,
        isRunning: action.payload,
      };
    }

    case 'SEARCH_MUSICS': {
      const search = action.payload;

      let listmusics: any = [...state.musics];
      if (search.length > 1) {
        listmusics = state.musics.filter((music: any) => {
          return music.name?.toLowerCase().trim().includes(search);
        });
      } else {
        listmusics = [];
      }
      return {
        ...state,
        searchMusic: listmusics,
      };
    }

    case 'NEXT':
      const newNext = action.payload;
      return {
        ...state,
        next: newNext,
      };
    // case "SET_OVERLAY":
    //     const idOverlay = action.payload;
    //     return {
    //         ...state,

    //     }
    case 'UP_LOADMUSIC':
      return {
        ...state,
        uploadMuiscs: action.payload,
      };

    default:
      return state;
  }
};

export default musicReducer;
