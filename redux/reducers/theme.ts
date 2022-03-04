import { SwipeTwoTone } from "@mui/icons-material"
import { deepOrange } from "@mui/material/colors";
import { AnyAction } from "redux"

const initialState = {
    theme: '#170f23'
}
const themeReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_THEME':
            const newTheme = action.payload;
            return {
                ...state,
                theme: newTheme
            }

        default:
            return state;
    }
}

export default themeReducer