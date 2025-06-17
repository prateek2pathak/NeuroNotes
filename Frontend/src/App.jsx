import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage";
import DecksPage from "./pages/DecksPages";
// import DecksDetails from "./pages/ḌeckDetails";
import StudyPage from "./pages/StudyPage";
import BrowseCardsPage from "./pages/BrowseCards";
import { Toaster } from 'react-hot-toast';
import { useLoading } from "./context/LoadingContext";
import AboutUs from "./pages/AboutUs";

function app() {
  const { loading } = useLoading();
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-t-indigo-600 border-white rounded-full animate-spin"></div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/decks/:deckId/study" element={<StudyPage />} />
        <Route path="/decks/browse/:deckId" element={<BrowseCardsPage />} />
      </Routes>
    </Router>
    </>
    
  )

}

export default app;
