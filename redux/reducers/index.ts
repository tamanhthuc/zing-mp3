import { combineReducers } from "redux";
import modelReducer from "./model";
import musicReducer from "./music";
import playlistReducder from "./playlists";
const rootReducer = combineReducers({
    music: musicReducer,
    playlists: playlistReducder,
    models: modelReducer
})
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;