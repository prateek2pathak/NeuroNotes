let cachedToken = null;


export const getCachedToken = ()=> cachedToken;

export const setCachedToken = (newToken)=>{
    cachedToken = newToken;
}

export const clearCachedToken = ()=>{
    cachedToken = null;
}