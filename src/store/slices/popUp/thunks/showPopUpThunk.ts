import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShowPopUpProps } from "../../../../types/storeTypes/IPopUpStore";
import { hidePopUp, showPopUp } from "../popUpSlice";

export const showPopUpCaller = createAsyncThunk(
    'popUp/showPopUpCaller',
    async (payload: IShowPopUpProps, { dispatch }) => {
        dispatch(showPopUp(payload));
        setTimeout(() => {
            dispatch(hidePopUp());
        }, 2000);
    }
);
