import { themes } from "../../types/storeTypes/IThemesState";

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
export default loadThemeFromLS