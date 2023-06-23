import React from "react";
import { ShoppingCartContextType } from "@/types";

export const ShoppingCartContext = React.createContext<ShoppingCartContextType>({
    items: [],
    totalValue: 0,
})