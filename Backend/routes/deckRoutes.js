import express from "express"
import {
    createDeck,
    getUserDecks,
    generateDecksUsingAI
} from "../controllers/deckControllers.js"
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/create',authenticate,createDeck);
router.get('/getDecks',authenticate,getUserDecks);
router.post('/generate',authenticate,generateDecksUsingAI);

export default  router;