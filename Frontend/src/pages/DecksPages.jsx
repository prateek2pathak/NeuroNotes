// src/pages/DecksPage.jsx
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { FaBook, FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateModalDeck from "../components/CreateDeckModal";
import AddCardModal from "../components/AddCardModal";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import AddUsingAiModal from "../components/AddUsingAiModal";
import { useAuthFetch } from "../utils/authFetch";


export default function DecksPage() {



  const [decks, setDecks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [addCardModal, setAddCardModel] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addUsingAiCardModel, setAddUsingAiCardModel] = useState(false);
  const user = useAuth();

  const authFetch = useAuthFetch();

  // Fetching all the decks
  useEffect(() => {



    const fetchDecks = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/deckRoutes/getDecks`);
        const data = await res.json();

        console.log(data);

        // Transform _id to id for UI compatibility if needed
        const decksWithCardCount = data.decks.map(deck => ({
          ...deck,
          id: deck._id,
          cardCount: deck.cards?.length || 0
        }));

        setDecks(decksWithCardCount);
      } catch (err) {
        console.error("Failed to fetch decks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDecks();
  }, [showModal, user]);

  const handleCreateDeck = async (newDeck) => {

    try {
      console.log(newDeck);

      const response = await authFetch(`${import.meta.env.VITE_BASE_URL}api/deckRoutes/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeck),
      });
      toast.success("Deck saved in Database successfully!");
    } catch (error) {
      console.error("Error creating deck:", error);
      toast.error("Failed to create deck in db");
    }
  };


  const onAddCard = async (card) => {
    try {
      const deck_id = selectedDeck.id;
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/add/${deck_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card)
      })

      // Check if response is NOT ok (e.g. 400 or 500)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add card");
      }

      console.log("Card is added ");
      toast.success("Card added successfully!");

    } catch (error) {
      console.error("Card add failed:", error.message);
      toast.error(error.message || "Failed to add card!");
    }

  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-4 pb-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Decks</h1>
            <div
              onClick={() => { setShowModal(true) }}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              <FaPlus />
              Create Deck
            </div>
          </div>

          {/* Mapping the decks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => setSelectedDeck(deck)}
                className="cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaBook className="text-indigo-500 text-xl" />
                  <h2 className="text-xl font-semibold">{deck.title}</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{deck.description}</p>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {deck.cardCount} cards
                </p>
              </div>
            ))}
            {decks.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-center mt-16">
                <FaBook className="text-5xl text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No decks found</h2>
                <p className="text-gray-500 dark:text-gray-400">You haven't created any flashcard decks yet.</p>
                <div
                  onClick={() => { setShowModal(true) }}
                  className="cursor-pointer mt-6 inline-block px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Create your first deck
                </div>
              </div>
            )}

            {/* Create deck modal */}
            <CreateModalDeck
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onCreate={handleCreateDeck}
            />
          </div>

          {/* Modal for deck actions */}
          {selectedDeck && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full text-center space-y-4">
                <h2 className="text-2xl font-bold">{selectedDeck.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{selectedDeck.description}</p>

                <div className="flex flex-col gap-3">
                  <Link
                    to={`/decks/${selectedDeck.id}/study`}
                    className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    📚 Study
                  </Link>
                  <div
                    onClick={() => setAddCardModel(true)}
                    className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    ➕ Add Cards
                  </div>
                  <div
                    onClick={() => setAddUsingAiCardModel(true)}
                    className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    ➕ Add Cards using AI
                  </div>
                  <Link
                    to={`/decks/browse/${selectedDeck.id}`}
                    className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  >
                    👁️ Browse Cards
                  </Link>
                  <button
                    onClick={() => setSelectedDeck(null)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add card in deck */}
          <AddCardModal
            isOpen={addCardModal}
            onClose={() => setAddCardModel(false)}
            onAddCard={onAddCard}
          />

          {addUsingAiCardModel && (
            <AddUsingAiModal
              isOpen={addUsingAiCardModel}
              onClose={() => setAddUsingAiCardModel(false)}
              deckId={selectedDeck.id}
            />
          )}
        </div>
      </div>
    </>


  );
}
