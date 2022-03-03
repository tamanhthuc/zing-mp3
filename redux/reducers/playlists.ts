import { AnyAction } from 'redux';

interface IsongProps {
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
interface initialProps  {
    isOpen: false,
    yourPlaylists: IsongProps[],
    listenedPlaylists: IsongProps[],

}


const initialState: initialProps = {
    isOpen: false,
    yourPlaylists: [],
    listenedPlaylists: []

}


const playlistReducder = (state =  initialState, action:AnyAction ) => {
    
    switch (action.type){
        case 'SET_OPEN_PLAYLISTS':
            return {
                ...state,
                isOpen: action.payload
            };  


        case 'ADD_YOUR_PLAYLISTS': {
            const newYourPlayLists = [...state.yourPlaylists];
            const newMusic = action.payload;
            const isExit = newYourPlayLists.filter((item : IsongProps) => item.id === newMusic.id);
            if (isExit.length === 0){
                newYourPlayLists.push(action.payload)
            }
            
            return {
                ...state,
                yourPlaylists: newYourPlayLists
            }
        }
        

        case 'REMOVE_YOUR_PLAYLISTS': {
            const newYourPlayLists = state.yourPlaylists.filter(music=>music.id !== action.payload.id);
            return {
                ...state,
                yourPlaylists: newYourPlayLists
            }
        }
        
        case 'LISTENED_PLAYLISTS': {
            const newListenedPlaylists = [...state.listenedPlaylists];
            const newMusic  = action.payload;
            const isExit = newListenedPlaylists.filter((item : IsongProps) => item.id === newMusic.id)
            if (isExit.length === 0){
                newListenedPlaylists.push(action.payload)

            }
            return {
                ...state,
                listenedPlaylists: newListenedPlaylists
            }

        }

        case 'REMOVE_LISTENTED_PLAYLISTS': {
            const newListentedPlayLists = state.listenedPlaylists.filter((music: any)=>music.id !== action.payload.id);
            return {
                ...state,
                listenedPlaylists: newListentedPlayLists
            }
        }
        default:
            return state
    }

}

export default playlistReducder;    