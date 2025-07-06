import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const DecksContext = createContext();


export const DecksProvider = ({children})=>{
    
    const [decks,setDecks] = useState([]);
    const [loadedFromCache,setLoadedFromCache] = useState(false);
    
    // on mount you check into local storage
    useEffect(()=>{
        const cached = localStorage.getItem("decks");

        if(cached){
            const {data,cachedAt} = JSON.parse(cached);
            const age = Date.now() - cachedAt;
            const maxAge = 5*60*1000;

            if(age<maxAge){
                setDecks(data);
                setLoadedFromCache(true);
                console.log("Decks loaded from cache",data);
                
                return;
            }
            else{
                localStorage.removeItem("decks");
            }
        }
    },[])

    //this will run whenever there happens to be change in data
    useEffect(()=>{
        if(!loadedFromCache) return; //skip immediate writing if data was fetched from cache itself

        localStorage.setItem("decks",JSON.stringify({
            data:decks,
            cachedAt: Date.now()
        }));

        console.log("Setting up data");
        console.log(decks);
        
    },[decks]);

    return (
        <DecksContext.Provider value={{decks,setDecks}}>
            {children}
        </DecksContext.Provider>
    )
}


export const useDecksContext = ()=> useContext(DecksContext);