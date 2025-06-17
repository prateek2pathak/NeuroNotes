// src/utils/authFetch.js
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLoading } from "../context/LoadingContext";

// Helper: wait until Firebase sets the current user
function waitForUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
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

      const token = await user.getIdToken();

      return await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return authFetch;
}
