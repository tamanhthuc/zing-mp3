import { combineReducers } from "redux";
import modelReducer from "./model";
import musicReducer from "./music";
import playlistReducder from "./playlists";
import themeReducer from "./theme";
const rootReducer = combineReducers({
    music: musicReducer,
    playlists: playlistReducder,    
    models: modelReducer,
    theme: themeReducer
})
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;