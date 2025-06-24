import express from "express"
import Deck from "../models/decks.js"
import User from "../models/user.js"
import ai_module from "../AI_module.js"


export const createDeck = async (req, res) => {
    try {
        const { title, description } = req.body;
        const uid = req.user.uid;
        if (!uid || !title) {
            return res.status(404).json({ error: "uid or title is missing" });
        }
        console.log(description);

        const deck = new Deck({ title, description, cards: [] });
        console.log(deck);

        await deck.save();

        const user = await User.findOneAndUpdate(
            { uid },
            { $push: { decks: deck._id } },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: "Deck created", deck });

    } catch (error) {
        console.log("Error ", error);

        res.status(500).json({ error: "Failed to create deck" });
    }
}

export const getUserDecks = async (req, res) => {
    try {
        const uid = req.user.uid;
        console.log(uid);

        //you can optimise this
        const user = await User.findOne({ uid }).populate("decks");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch decks" });
    }
}


// will implement this later
export const generateDecksUsingAI = async (req, res) => {
    console.log("ai services are hit");

    try {
        const { prompt, title, description } = req.body;

        if (!title || !prompt) {
            return res.status(400).json({ error: 'Title and prompt are required.' });
        }

        const generatedCards = await ai_module(prompt);
        const uid = "";

        const deck = new Deck({ title, description, cards: [] });
        deck.cards.push(...generatedCards);
        await deck.save();

        const user = await User.findOneAndUpdate(
            { uid },
            { $push: { decks: deck._id } },
            { upsert: true, new: true }
        )

        res.status(201).json({ message: "AI Deck created", deck });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate AI deck" });
    }
} 