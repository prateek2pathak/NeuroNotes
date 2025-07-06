import toast from "react-hot-toast";
import { getCachedCards, setCardsInCache } from "../utils/cardCache";

export const fetchCardHandler = async (authFetch, setCards, deckId) => {
    const cachedCards = getCachedCards(deckId);

    try {
        if (cachedCards) {
            setCards(cachedCards);
        }
        else {
            const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/deck/${deckId}`);
            const data = await res.json();
            setCards(data.cards);
            setCardsInCache(deckId, data.cards);

        }
        toast.success("Cards loaded");

    } catch (error) {
        console.error("Load card failed:", error);
        toast.error("Failed to load card!");
    }

}

