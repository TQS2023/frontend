import React from "react";
import {UserContextType} from "@/types";

export const UserContext = React.createContext<UserContextType>({
    token: null
})