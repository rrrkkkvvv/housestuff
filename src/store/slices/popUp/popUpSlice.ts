import { createSlice,  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IShowPopUpProps } from '../../../types/storeTypes/TPopUpStore';

export interface popUpState extends IShowPopUpProps {
    showPopUp: boolean;
}

const initialState: popUpState = {
    popUpBg: 'green',
    popUpText: '',
    showPopUp: false,
};



const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        showPopUp: (state, action: PayloadAction<IShowPopUpProps>) => {
            state.popUpText = action.payload.popUpText;
            state.popUpBg = action.payload.popUpBg;
            state.showPopUp = true;
        },
        hidePopUp: (state) => {
            state.showPopUp = false;
            state.popUpText = '';
        },
        
    },

    selectors:{
        selectPopUp:(state)=> state
    }
});

export const { showPopUp, hidePopUp } = popUpSlice.actions;
export const { selectPopUp } = popUpSlice.selectors;
const popUpReducer = popUpSlice.reducer;
export default popUpReducer;
