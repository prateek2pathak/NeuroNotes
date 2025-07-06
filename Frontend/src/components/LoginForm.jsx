// src/components/LoginForm.jsx
import { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUsingGoogle } from "../handlers/googleLoginHandler";
import { loginHandler } from "../handlers/localAuthenticator";

export default function LoginForm() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    await loginHandler(setError,formData,navigate);
  };

  const handleGoogleLogin = async () => {
    await loginUsingGoogle(navigate, setError);
  }

  return (
    <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        Log in to access your AI-powered flashcards
      </p>

      <div className="flex items-center mb-4 rounded-lg border dark:border-gray-600 px-3 bg-white dark:bg-gray-800">
        <FaEnvelope className="text-gray-400 dark:text-gray-500 mr-2" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-2 bg-transparent focus:outline-none text-gray-800 dark:text-white"
        />
      </div>

      <div className="flex items-center mb-4 rounded-lg border dark:border-gray-600 px-3 bg-white dark:bg-gray-800">
        <FaLock className="text-gray-400 dark:text-gray-500 mr-2" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full py-2 bg-transparent focus:outline-none text-gray-800 dark:text-white"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        Log In
      </button>

      <button
        onClick={handleGoogleLogin}
        className="w-full mt-3 flex justify-center items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 border dark:border-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
      >
        <FaGoogle /> Log In with Google
      </button>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
    </div>
  );
}
