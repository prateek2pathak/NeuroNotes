// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function useAuth() {

  const [user, setUser] = useState(()=>{
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(firebaseUser) => {
      if(firebaseUser){
        const {uid,displayName,email} = firebaseUser;
        setUser({uid,displayName,email});
        localStorage.setItem("user",JSON.stringify({uid,displayName,email}));
        
      }
      else{
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
