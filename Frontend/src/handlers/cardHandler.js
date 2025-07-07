import toast from "react-hot-toast";
import { getCachedCards, setCardsInCache } from "../utils/cardCache";

export const addCardHandler = async (card, authFetch, selectedDeck) => {
  try {
    const deck_id = selectedDeck.id;
    const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/add/${deck_id}`, {
      method: "POST",
      body: JSON.stringify(card)
    })

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add card");
    }

    const oldCards = getCachedCards(selectedDeck.id);
    if(oldCards){
      const updatedCards = [...oldCards,card];
      setCardsInCache(selectedDeck.id,updatedCards);
    }
    
    localStorage.removeItem("decks");
    
    console.log("Card is added ");
    toast.success("Card added successfully!");

  } catch (error) {
    console.error("Card add failed:", error.message);
    toast.error(error.message || "Failed to add card!");
  }

}

export const deleteCardHandler = async (cardId, authFetch, deckId, setCards, cards) => {
  try {
    const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/delete/${deckId}/${cardId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete card");
    }

    // Update state to remove deleted card
    const updatedCards = cards.filter((card)=> card._id!== cardId);
    setCards(updatedCards);
    setCardsInCache(deckId, updatedCards);

    toast.success("Card deleted successfully!");
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Error in deleting card!");
  }
};


export const editCardHandler = async (card, authFetch, cardId, deckId, setCards, cards) => {
  const { front, back } = card;

  if (!front || !back) {
    toast.error("Both question and answer are required!");
    return;
  }
  try {
    const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/update/${deckId}/${cardId}`, {
      method: "PUT",
      body: JSON.stringify(card),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update");
    }

    // Update the card in local state
    const updatedCards = cards.map((c) =>
      c._id === cardId ? { ...c, question: front, answer: back } : c
    );

    setCards(updatedCards);
    setCardsInCache(deckId, updatedCards);
    toast.success("Card updated successfully!");
  } catch (error) {
    console.error("Edit card failed:", error);
    toast.error("Failed to update card!");
  }
};
