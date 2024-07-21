import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IShowPopUpProps } from '../../types/storeTypes/IPopUpContext';

export interface popUpState extends IShowPopUpProps {
    showPopUp: boolean;
}

const initialState: popUpState = {
    popUpBg: 'green',
    popUpText: '',
    showPopUp: false,
};

export const showPopUpFn = createAsyncThunk(
    'popUp/showPopUpFn',
    async (payload: IShowPopUpProps, { dispatch }) => {
        dispatch(showPopUp(payload));
        setTimeout(() => {
            dispatch(hidePopUp());
        }, 2000);
    }
);

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
