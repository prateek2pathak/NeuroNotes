import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const DecksContext = createContext();


export const DecksProvider = ({children})=>{
    
    const [decks,setDecks] = useState([]);

    return (
        <DecksContext.Provider value={{decks,setDecks}}>
            {children}
        </DecksContext.Provider>
    )
}


export const useDecksContext = ()=> useContext(DecksContext);