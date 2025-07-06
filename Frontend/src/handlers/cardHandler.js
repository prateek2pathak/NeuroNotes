import toast from "react-hot-toast";
import { setCardsInCache } from "../utils/cardCache";

export const addCardHandler = async (card,authFetch,selectedDeck) => {
    try {
      const deck_id = selectedDeck.id;
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/add/${deck_id}`, {
        method: "POST",
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

export const deleteCardHandler = async (cardId,authFetch,deckId,setCards,cards) => {
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
      setCardsInCache(deckId,cards);

      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error in deleting card!");
    }
  };
  

  export const editCardHandler = async (card,authFetch,cardId,deckId,setCards,cards) => {
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
      setCards((prevCards) =>
        prevCards.map((c) =>
          c._id === cardId ? { ...c, question: front, answer: back } : c
        )
      );

      setCardsInCache(deckId,cards);
      toast.success("Card updated successfully!");
    } catch (error) {
      console.error("Edit card failed:", error);
      toast.error("Failed to update card!");
    }
  };