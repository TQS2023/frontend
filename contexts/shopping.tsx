import React, {useEffect} from "react";
import { ShoppingCartContextType } from "@/types";

export const ShoppingCartContext = React.createContext<ShoppingCartContextType>({
    data: {
        items: [],
        totalValue: 0
    },
    setData: () => {}
});

export const ShoppingCartData = ({ children}: {children: React.ReactNode }) => {
    const [data, setData] = React.useState<ShoppingCartContextType["data"]>({
        items: [],
        totalValue: 0
    });

    useEffect(() => {
        const storedData = localStorage.getItem("shoppingCart");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(data));
    }, [data]);

    return (
        <ShoppingCartContext.Provider value={{ data, setData }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
