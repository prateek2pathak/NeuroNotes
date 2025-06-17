// src/components/RegisterForm.jsx
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaHashtag, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      setSuccess("Registered successfully.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const fields = [
    { name: "name", icon: <FaUser /> },
    { name: "email", icon: <FaEnvelope /> },
    { name: "password", icon: <FaLock />, type: "password" },
    { name: "confirmPassword", icon: <FaLock />, type: "password" },
  ];

  return (
    <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Create Smart Account
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        Flashcards generated just for you by AI
      </p>

      {fields.map(({ name, icon, type }) => (
        <div key={name} className="flex items-center mb-4 rounded-lg border dark:border-gray-600 px-3 bg-white dark:bg-gray-800">
          <span className="text-gray-400 dark:text-gray-500 mr-2">{icon}</span>
          <input
            type={type || "text"}
            name={name}
            placeholder={
              name === "confirmPassword"
                ? "Confirm Password"
                : name.charAt(0).toUpperCase() + name.slice(1)
            }
            value={formData[name]}
            onChange={handleChange}
            className="w-full py-2 bg-transparent focus:outline-none text-gray-800 dark:text-white"
          />
        </div>
      ))}

      <button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        Sign Up
      </button>

      <button
        onClick={handleGoogleSignUp}
        className="w-full mt-3 flex justify-center items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border dark:border-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
      >
        <FaGoogle /> Sign Up with Google
      </button>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
    </div>
  );
}
