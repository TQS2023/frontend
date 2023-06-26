import React, {useEffect} from "react";
import {UserContextType} from "@/types";

export const UserContext = React.createContext<UserContextType>({
    data: {
        token: null,
    },
    setData: () => {},
});

export const UserContextData = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = React.useState<UserContextType["data"]>({
        token:  null
    });

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(data));
    }, [data]);

    return (
        <UserContext.Provider value={{data, setData}}>
            {children}
        </UserContext.Provider>
    )
}