import { createSlice } from '@reduxjs/toolkit';
import {  TColorTheme, themes } from '../../../types/storeTypes/TThemesState';
import loadThemeFromLS from '../../../utils/localStorage/loadThemeFromLS';
import deepEqual from '../../../utils/objectsDeepEqual';



export interface IThemeSliceProps {
    currentTheme: TColorTheme;
    reversedCurrentTheme: TColorTheme;
}

const initialState: IThemeSliceProps = {
    currentTheme: themes[loadThemeFromLS().currentTheme],
    reversedCurrentTheme: themes[loadThemeFromLS().reversedCurrentTheme]
}

const themeSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        toggleTheme: (state: IThemeSliceProps) => {
             
            if (deepEqual(JSON.parse(JSON.stringify(state)).currentTheme, themes.light)) {
                state.currentTheme = themes.dark;
                state.reversedCurrentTheme = themes.light;
             } else if (deepEqual(JSON.parse(JSON.stringify(state)).currentTheme, themes.dark)) {
                state.currentTheme = themes.light;
                state.reversedCurrentTheme = themes.dark;
            } 
     
            localStorage.setItem('currentTheme', JSON.stringify(state.currentTheme));
        }
    },
    selectors:{
        selectCurrentTheme:(state)=>state.currentTheme,
        selectReversedCurrentTheme:(state)=>state.reversedCurrentTheme,
    }
});

export const { toggleTheme } = themeSlice.actions;
export const { selectCurrentTheme, selectReversedCurrentTheme } = themeSlice.selectors;

const themeReducer = themeSlice.reducer;
export default themeReducer;
