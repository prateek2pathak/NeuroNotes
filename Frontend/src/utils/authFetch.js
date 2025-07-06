// src/utils/authFetch.js
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLoading } from "../context/LoadingContext";
import { getCachedToken, setCachedToken } from "./authtokenManager";

function waitForUser() {
  //creating a promise as checking status takes time
  return new Promise((resolve) => {
    //callback helps to wait until it returns user
    const unsub = onAuthStateChanged(auth, (user) => {
      //onAuthStateChanged returns a function which can be called once you want to unsubcribe the listener
      unsub();
      resolve(user);
    });
  });
}

// Custom hook that returns the fetch function with loading spinner support
export function useAuthFetch() {

  const { setLoading } = useLoading();

  const authFetch = async (url, options = {}) => {
    setLoading(true);
    try {

      const user = auth.currentUser || await waitForUser();
      if (!user) throw new Error("No authenticated user");

      let token = getCachedToken();

      if (!token) {
        token = await user.getIdToken();
        setCachedToken(token);
        console.log("New token fetched!");
      }
      else{
        console.log("Using cached token!!");
        
      }

      return await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
    catch (error) {
      return res.send(400).json({ error: error.message });
    }
    finally {
      setLoading(false);
    }
  };

  return authFetch;
}
