export type TColorTheme = {
    background: string,
    color: string,
}

export type TColorThemes = {
    light: TColorTheme,
    dark: TColorTheme,
}
export const themes: TColorThemes = {
    light: {
        background: '#fff',
        color: '#222',
    },
    dark: {
        background: '#333',
        color: '#fff',
    },
}
export type TThemesContextValue ={
    currentTheme: TColorTheme,
    reversedCurrentTheme: TColorTheme,
    toggleTheme: () => void,
}