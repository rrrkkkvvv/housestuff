export interface IColorTheme {
    background: string,
    color: string,
}

export interface IColorThemes {
    light: IColorTheme,
    dark: IColorTheme,
}

export interface IThemesContextValue {
    currentTheme: IColorTheme,
    reversedCurrentTheme: IColorTheme,
    toggleTheme: () => void,
}