import toast from "react-hot-toast";

export const handleCreateDeck = async (newDeck, authFetch, setDecks) => {

    try {
        console.log(newDeck);
        const response = await authFetch(`${import.meta.env.VITE_BASE_URL}api/deckRoutes/create`, {
            method: "POST",
            body: JSON.stringify(newDeck),
        });

        //you should wait for response to come before doing .deck
        //you made an error here 
        const res = await response.json();

        setDecks((prev) => {
            return [
                ...prev,
                {
                    ...res.deck,
                    id: res.deck._id,
                    cardCount: 0,
                },
            ]
        })

        toast.success("Deck saved in Database successfully!");
    }
    catch (error) {
        console.error("Error creating deck:", error);
        toast.error("Failed to create deck in db");
    }
};


export const handleFetchDeck = async (authFetch,setDecks) => {
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
        console.log(decksWithCardCount);

        setDecks(decksWithCardCount);
    } catch (err) {
        console.error("Failed to fetch decks", err);
    }
};