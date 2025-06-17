import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    decks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Decks"
        }
    ],
})

export default mongoose.model("User",user_schema);