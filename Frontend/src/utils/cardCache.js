const cardsCache = {};


export const setCardsInCache = (deckId,cards)=>{
    cardsCache[deckId] = cards;
}

export const getCachedCards = (deckId)=>{
    return cardsCache[deckId] || null;
}

export const clearCachedCard = (deckId)=>{
    if(deckId) delete cardsCache[deckId];
    else{
        for(const key in cardsCache){
            delete cardsCache[key];
        }
    }
}