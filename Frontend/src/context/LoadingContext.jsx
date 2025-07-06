// src/context/LoadingContext.js
import { createContext, useContext, useState } from "react";



// This creates the context object (LoadingContext) — it will hold your global loading state.
const LoadingContext = createContext();


//All the children(component) which needs value are need to be wrapped
//🔴 If a component is not wrapped inside <LoadingProvider>, it cannot access the context using useLoading() — and doing so will return undefined, or even throw an error.
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// A custom hook to easily use the context anywhere:
// const { loading, setLoading } = useLoading();
export const useLoading = () => useContext(LoadingContext);
