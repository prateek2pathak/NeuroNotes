import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import EditCardModal from "../components/EditCardModal";
import { useAuthFetch } from "../utils/authFetch";
import { getCachedCards, setCardsInCache } from "../utils/cardCache";
import { fetchCardHandler } from "../handlers/fetchCardHandler";
import { deleteCardHandler, editCardHandler } from "../handlers/cardHandler";

export default function BrowseCardsPage() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [editCardModal, setEditCardModal] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [cardId, setCardId] = useState(null);
  const authFetch = useAuthFetch();

  console.log(deckId);

  const navigate = useNavigate();

  // Fetching all the cards
  useEffect(() => {
    fetchCardHandler(authFetch,setCards,deckId);
  }, [])

  const handleEditCard = async (card) => {
    await editCardHandler(card,authFetch,cardId,deckId,setCards,cards);
  };

  const handleDeleteCard = async (cardId) => {
    await deleteCardHandler(cardId,authFetch,deckId,setCards,cards);
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

      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Cards</h1>

        {cards.length === 0 ? (
          <p className="text-xl text-center text-gray-500 dark:text-gray-400">
            No cards found in this deck.
          </p>
        ) : (
          <ul className="space-y-6">
            {cards.map((card) => (
              <li
                key={card._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-3">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">Q: {card.question}</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">A: {card.answer}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      
                      setEditQuestion(card.question);
                      setEditAnswer(card.answer);
                      setCardId(card._id);
                      setEditCardModal(true);
                      
                    }}
                    className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card._id)}
                    className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <EditCardModal
          isOpen={editCardModal}
          onClose={() => setEditCardModal(false)}
          onSubmit={handleEditCard}
          question={editQuestion}
          answer={editAnswer}
        />
      </div>
    </div>
  );
}
