import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import EditCardModal from "../components/EditCardModal";
import { useAuthFetch } from "../utils/authFetch";

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
    const fetchCards = async () => {
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/deck/${deckId}`);
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, [])



  const handleEditCard = async (card) => {
    const { front, back } = card;

    if (!front || !back) {
      toast.error("Both question and answer are required!");
      return;
    }
    try {
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/update/${deckId}/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update");
      }

      // Update the card in local state
      setCards((prevCards) =>
        prevCards.map((c) =>
          c._id === cardId ? { ...c, question: front, answer: back } : c
        )
      );

      toast.success("Card updated successfully!");
    } catch (error) {
      console.error("Edit card failed:", error);
      toast.error("Failed to update card!");
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/delete/${deckId}/${cardId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete card");
      }

      // Update state to remove deleted card
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));

      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error in deleting card!");
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
