interface songModelProps {
    name: string,
    singer: string,
    image: string,
    song: string,
    id: string,


}

interface singerModelProps {
    name: string,
    avatar: string,
    message: string,
    image: string,
    time: string,
    id: string
}
interface initialProps{
    model: boolean, 
    songModel: songModelProps,
    isSign: boolean,
    singerModel: singerModelProps
}

const initialState: initialProps = {
    model: false,
    songModel: {
        name: "",
        singer: "",
        image: "",
        song: "",
        id: ""
    },
    isSign: false,
    singerModel: {
        name: "",
        avatar: "",
        message: "",
        time: "",
        id: "",
        image: ""
    }

}
const modelReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case "SET_MODEL":
            const newModel = action.payload;
            return {
                ...state,
                model: newModel
            }
        case "Set_Song_Model":
            const newSongModel = action.payload;

            return {
                ...state,
                songModel:newSongModel
            } 
        
        case "Set_Singer_Model":
            const newSingerModel = action.payload;
            return {
                ...state,
                singerModel: newSingerModel
            }

        case "Is_SignIn": 
            const newIsSign = action.payload;
            return {
                ...state,
                isSign: newIsSign
            }
       
        
       
        default:
            return state;
    
    }
}

export default modelReducer;