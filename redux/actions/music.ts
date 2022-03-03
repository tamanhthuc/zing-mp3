export const setRunning = (music: any) => {
    return {
        type: 'SET_RUNNING',
        payload: music
    }   
}

export const setOverlay = (id: string) => {
    return {
        type: 'SET_OVERLAY',
        payload: id
    }
}

export const removeRunning = (music: any) => {
    return {
        type: 'REMOVE_RUNNING',
        payload: music
    }
}
export const getDataMusic = (music: any) => {
    return {
        type: 'GET_DATA_MUSICS',
        payload: music
    }
}

export const randomMusic = (music: any) => {
    return {
        type: 'RANDOM_MUSIC',
        payload: music
    }
}

export const searchMusics = (value: any)=>{
    return{
        type: 'SEARCH_MUSICS',
        payload: value
    }
}

export const isRunning = (boolean: boolean)=>{
    return{
        type: 'IS_RUNNING',
        payload: boolean
    }
}

export const Next = (next: number ) => {
    return {
        type: "NEXT",
        payload: next
    }
}

export const upLoadMusic = (music:any) => {
    return {
        type: 'UP_LOADMUSIC',
        payload: music
    }
}

