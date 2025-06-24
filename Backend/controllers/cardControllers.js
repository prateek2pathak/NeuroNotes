import Decks from "../models/decks.js";
import ai_module from "../AI_module.js"

export const addCard = async(req,res)=>{
    // console.log(deckId);
    
    const {question,answer}=req.body;
    
    try {
        const {deckId} = req.params;
        const deck = await Decks.findById(deckId);

        if(!deck) return res.status(404).json({error:"Deck not found!!"});

        deck.cards.push({question,answer});
        await deck.save();

        return res.status(200).json({message:"Card saved successfully"});

    } catch (error) {
        return res.status(500).json({message:"Error occurred while adding card!",error:error.message});
    }
}

export const updateCard = async(req,res)=>{
    const {deckId,cardId} = req.params;
    const {front,back} = req.body;
    

    try {
    const deck = await Decks.findById(deckId);
    if (!deck) return res.status(404).json({ error: "Deck not found" });

    const card = deck.cards.id(cardId); //id() is used becuse it is a subdocument in document
    if (!card) return res.status(404).json({ error: "Card not found" });

    card.question = front;
    card.answer = back;
    await deck.save();

    return res.status(200).json({message:"Card updated successfully"});
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
}


export const deleteCard = async(req,res)=>{
    try {
        const {deckId,cardId} = req.params;

        const deck = await Decks.findById(deckId);
        if (!deck) return res.status(404).json({ error: "Deck not found" });

        const card = deck.cards.id(cardId);
        if (!card) return res.status(404).json({ error: "Card not found" });

        deck.cards.pull({ _id: cardId });

        await deck.save();
        
        return res.status(200).json({message:"Card deleted successfully"});

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Delete card error", error: error.message });
    }
}

export const getCards = async(req,res)=>{
    const {deckId} = req.params;
    try {
        const deck = await Decks.findById(deckId);
        if (!deck) return res.status(404).json({ error: "Deck not found" });
        const cards = deck.cards;
        return res.status(200).json(cards);

    } catch (error) {
        return res.status(500).json({message:"Getting card error" , error:error.message});
    }

}

export const genAI = async (req, res) => {
  const { prompt, deckId } = req.body;
  try {

    const cards = await ai_module(prompt); // your AI logic
    
    const deck = await Decks.findById(deckId);

    cards.forEach(c => {
        deck.cards.push({ question: c.question, answer: c.answer });
    });

    await deck.save();
    console.log(cards);
    console.log(deck.cards);
    
    res.status(200).json(cards);
  } catch (err) {
    console.error("AI card gen failed:", err);
    res.status(500).json({ message: "AI card generation failed" });
  }
}

