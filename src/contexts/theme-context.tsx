import { createContext, useState, useEffect } from "react";
import { ContextProps } from "./context types/IContext";
import { IColorThemes, IColorTheme, IThemesContextValue } from "./context types/IThemesContext";

const themes: IColorThemes = {
    light: {
        background: '#fff',
        color: '#222',
    },
    dark: {
        background: '#333',
        color: '#fff',
    },
}


export default function ThemesContextProvider({ children }: ContextProps) {

    useEffect(() => {
        const storedCurrentTheme = localStorage.getItem('currentTheme');
        console.log(storedCurrentTheme)
        if (storedCurrentTheme === '{"background":"#fff","color":"#222"}') {
            setCurrentTheme(themes.light);
            setReversedCurrentTheme(themes.dark);
        } else {
            setCurrentTheme(themes.dark);
            setReversedCurrentTheme(themes.light);
        }

    }, [])

    let [currentTheme, setCurrentTheme] = useState<IColorTheme>(themes.light);
    let [reversedCurrentTheme, setReversedCurrentTheme] = useState<IColorTheme>(themes.dark);





    function toggleTheme(): void {

        setReversedCurrentTheme(currentTheme === themes.light ? themes.light : themes.dark);

        setCurrentTheme((prevState) => prevState === themes.light ? themes.dark : themes.light);
        localStorage.setItem('currentTheme', JSON.stringify(reversedCurrentTheme));

    }

    if (currentTheme === themes.light) {
        document.body.style.backgroundColor = "#fff";
    } else {
        document.body.style.backgroundColor = "#333";

    }

    const value = {

        currentTheme,
        reversedCurrentTheme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

}



export const ThemeContext = createContext<IThemesContextValue | undefined>(undefined);