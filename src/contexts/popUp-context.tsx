import { useState, createContext } from 'react'
import { ContextProps } from './context types/IContext';
import { IPopUpContextValue, ShowPopUpFnType } from './context types/IPopUpContext';

export default function PopUpContextProvider({ children }: ContextProps) {

    let [showPopUp, setShowPopUp] = useState<boolean>(false);
    let [popUpText, setPopUpText] = useState<string>("");
    let [popUpBgRed, setPopUpBgRed] = useState<boolean>(false);

    function showPopUpFn({ type, text }: ShowPopUpFnType): void {


        if (type === "red") {
            setPopUpText(popUpText = text);
            setPopUpBgRed(true);
        } else {
            setPopUpText(popUpText = text);
            setPopUpBgRed(false);
        }
        setShowPopUp(true);
        setTimeout(() => {
            setShowPopUp(false);
            setPopUpBgRed(false);
            setPopUpText(popUpText = "");

        }, 2000);
    }


    const value: IPopUpContextValue = {

        popUpBgRed,
        popUpText,
        showPopUp,
        showPopUpFn,
    }

    return (
        <PopUpContext.Provider value={value}>
            {children}
        </PopUpContext.Provider>
    )
}

export const PopUpContext = createContext<IPopUpContextValue | undefined>(undefined);
