// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBrain, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { clearCachedToken } from "../utils/authTokenManager";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {    
    await auth.signOut();
    localStorage.removeItem("user");
    clearCachedToken();
    navigate("/auth");
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xl font-bold">
          <FaBrain className="text-2xl" />
          NeuroNotes
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</Link>
          {
            user ? (
              <Link to="/decks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">My Decks</Link>
            ):<Link to="/auth" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">My Decks</Link>
          }
          
          <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-500 dark:text-gray-400">Hello, {user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 dark:text-gray-300 text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-white dark:bg-gray-900 px-4 pb-4 space-y-2 text-gray-700 dark:text-gray-200">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          {
            user ? <Link to="/decks" onClick={toggleMenu}>My Decks</Link> :
            <Link to="/auth" onClick={toggleMenu}>My Decks</Link>
          }
          

          {user ? (
            <>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">Hello, {user.displayName || user.email}</span>
              <button onClick={() => { toggleMenu(); handleLogout(); }} className="text-red-600 dark:text-red-400 font-medium text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={toggleMenu} className="text-indigo-600 dark:text-indigo-400 font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
