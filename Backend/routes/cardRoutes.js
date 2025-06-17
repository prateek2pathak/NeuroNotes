import express from "express"
import {addCard, updateCard, deleteCard,getCards, genAI} from  "../controllers/cardControllers.js"
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();

// Add a card to a deck
router.post("/add/:deckId",authenticate, addCard);

// Update a specific card
router.put('/update/:deckId/:cardId',authenticate, updateCard);

// Delete a specific card
router.delete("/delete/:deckId/:cardId",authenticate, deleteCard);

// Get all cards in a deck
router.get("/deck/:deckId",authenticate, getCards);

router.post("/generateAI",authenticate,genAI);




export default router;