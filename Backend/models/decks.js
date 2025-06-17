import mongoose from "mongoose";


const card = new mongoose.Schema({
    question: String,
    answer:String
})

const deck = new mongoose.Schema({
    title: String,
    description: String,
    cards : [card]
})

export default mongoose.model("Decks",deck);