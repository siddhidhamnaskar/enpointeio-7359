
import { createContext, useState } from "react";


export const tokenContext=createContext({});

export function TokenContextProvider({children}){
    const [token,setToken]=useState("");

    return(
        <tokenContext.Provider value={{token,setToken}}>
            {children}
        </tokenContext.Provider>
    )

}