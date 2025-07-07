export const updateDecksCache = (decks)=>{
    localStorage.setItem("decks",JSON.stringify({
        data:decks,
        cachedAt: Date.now()
    }))
}