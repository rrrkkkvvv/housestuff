import { createAsyncThunk } from "@reduxjs/toolkit";
import { IShowPopUpProps } from "../../../../types/storeTypes/TPopUpStore";
import { hidePopUp, showPopUp } from "../";

export const showPopUpCaller = createAsyncThunk(
    'popUp/showPopUpCaller',
    async (payload: IShowPopUpProps, { dispatch }) => {
        dispatch(showPopUp(payload));
        setTimeout(() => {
            dispatch(hidePopUp());
        }, 2000);
    }
);
