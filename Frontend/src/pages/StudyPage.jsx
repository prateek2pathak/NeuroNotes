import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthFetch } from "../utils/authFetch";


export default function StudyPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const authFetch = useAuthFetch();


  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCard = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/deck/${deckId}`)
        if (!res.ok) {
          console.log(res);

          throw new Error("res");

        }
        const data = await res.json();
        setCards(data);
        console.log("Cards loaded");
        toast.success("Cards loaded");
      } catch (error) {
        console.error("Load card failed:", error);
        toast.error("Failed to load card!");
      }

    }
    loadCard();
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      alert("You've finished all cards!");
      navigate('/decks');
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">

      {/* Go Back Button */}
      <button
        onClick={() => navigate("/decks")}
        className="absolute top-6 left-4 md:left-10 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back to Decks
      </button>

      <div className="max-w-3xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold mb-8">Study Deck</h1>

        {/* Handle no cards */}
        {cards.length === 0 ? (
          <p className="text-xl text-gray-500 dark:text-gray-400">No cards found in this deck.</p>
        ) : (
          <>
            {/* Card Flip Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer select-none bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 text-center text-2xl font-semibold mx-auto transition-transform duration-300 hover:scale-[1.03]"
              style={{ minHeight: "220px" }}
              title="Click to flip card"
            >
              {isFlipped ? currentCard.answer : currentCard.question}
            </div>

            {/* Next Button */}
            <div className="mt-6">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Next Card →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
