import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaRocket, FaMagic, FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import AiCardFlowModal from "../components/AiCardFlowModal";
import useAuth from "../hooks/useAuth";


export default function HomePage() {

  const [showAiFlow, setShowAiFlow] = useState(false);
  const user = useAuth();

  return (

    <>
      <Navbar />
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">


      <div className="max-w-4xl mx-auto px-6 py-30 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Supercharge Your Learning with <span className="text-indigo-600 dark:text-indigo-400">AI-Generated Flashcards</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
          Just give us a topic, and we’ll build a full flashcard deck tailored to your learning goals. Fast. Smart. Easy.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <div
            onClick={() => setShowAiFlow(true)}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-all flex items-center gap-2"
          >
            <FaMagic /> Generate Deck
          </div>
          {
            user ? (
              <Link
                to="/decks"
                className="bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FaBookOpen /> My Decks
              </Link>
            ) :
              (
                <Link
                  to="/auth"
                  className="bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <FaBookOpen /> My Decks
                </Link>
              )
          }



        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-500 mt-12">
        Built for students & learners. Powered by AI.
      </div>

      {showAiFlow && <AiCardFlowModal isOpen={showAiFlow} onClose={() => setShowAiFlow(false)} />}
    </div>
    </>
  );
}
