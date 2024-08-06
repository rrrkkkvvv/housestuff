export interface IColorTheme {
    background: string,
    color: string,
}

export interface IColorThemes {
    light: IColorTheme,
    dark: IColorTheme,
}
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
export interface IThemesContextValue {
    currentTheme: IColorTheme,
    reversedCurrentTheme: IColorTheme,
    toggleTheme: () => void,
}