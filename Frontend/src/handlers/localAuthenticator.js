import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const loginHandler =  async (setError,formData,navigate) => {
    const { email, password } = formData;
    setError("");

    if (!email || !password) return setError("Please fill in all fields.");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

export const registerHandler = async (setError,setSuccess,formData,navigate,setFormData) => {

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      //we are adding display name in profile
      await updateProfile(auth.currentUser, { displayName: name });

      setSuccess("Registered successfully.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate('/');

    } catch (err) {
      setError(err.message);
    }
  };
