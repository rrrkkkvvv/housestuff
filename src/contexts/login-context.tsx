import { useState, createContext} from 'react'
import { ContextProps } from './context types/IContext';
import {  ILoginContextValue } from './context types/ILoginContext';
export default function LoginContextProvider({ children }: ContextProps) {
    




    let [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const value: ILoginContextValue = {
        isLoggedIn,
        handleLogin,

    }


    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )

}
export const LoginContext = createContext<ILoginContextValue | undefined>(undefined);
