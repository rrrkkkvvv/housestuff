import { createSlice } from '@reduxjs/toolkit';
import { IColorThemes, IColorTheme } from '../../contexts/context types/IThemesContext';

export const themes: IColorThemes = {
    light: {
        background: '#fff',
        color: '#222',
    },
    dark: {
        background: '#333',
        color: '#fff',
    },
}

const loadThemeFromLS = (): { currentTheme: "dark" | "light", reversedCurrentTheme: "dark" | "light" } => {
    const storedCurrentTheme = localStorage.getItem('currentTheme');

    if (storedCurrentTheme) {
        try {
            const theme = JSON.parse(storedCurrentTheme);
            if (theme.background === themes.light.background && theme.color === themes.light.color) {
                return {
                    currentTheme: "light",
                    reversedCurrentTheme: "dark"
                };
            } else {
                return {
                    currentTheme: "dark",
                    reversedCurrentTheme: "light"
                };
            }
        } catch (error) {
            console.error('Error parsing currentTheme:', error);
            return {
                currentTheme: "light",
                reversedCurrentTheme: "dark"
            };
        }
    } else {
        return {
            currentTheme: "light",
            reversedCurrentTheme: "dark"
        };
    }
}

function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export interface IThemeSliceProps {
    currentTheme: IColorTheme;
    reversedCurrentTheme: IColorTheme;
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
