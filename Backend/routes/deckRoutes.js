import express from "express"
import {
    createDeck,
    getUserDecks,
    generateDecksUsingAI,
    removeUserDeck
} from "../controllers/deckControllers.js"
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/create',authenticate,createDeck);
router.get('/getDecks',authenticate,getUserDecks);
router.post('/generate',authenticate,generateDecksUsingAI);
router.delete('/deleteDeck',authenticate,removeUserDeck);

export default  router;