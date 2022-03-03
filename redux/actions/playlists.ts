export const setOpenPlaylists = (isPlaylists:boolean ) =>{
    return {
        type: 'SET_OPEN_PLAYLISTS',
        payload: isPlaylists
    }
}
export const addYourPlaylists = (music: any) =>{
    return{
         type: 'ADD_YOUR_PLAYLISTS',
         payload: music
    }
}

export const removeYourPlaylists = (music: any) =>{
    return{
         type: 'REMOVE_YOUR_PLAYLISTS',
         payload: music
    }
}
export const listenedPlaylists = (music: any) =>{
    return{
        type: 'LISTENED_PLAYLISTS',
        payload: music
    }
}

export const removeListenedPlaylists = (music: any) =>{
    return{
         type: 'REMOVE_LISTENTED_PLAYLISTS',
         payload: music
    }
}