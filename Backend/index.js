import express from "express"
import dotenv from "dotenv"
import db from "./db/db.js"
import cors from "cors"

import deckRoutes from "./routes/deckRoutes.js"
import cardRoutes from "./routes/cardRoutes.js"

dotenv.config();
db();

const app = express();

const PORT = process.env.PORT || 4040;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/deckRoutes',deckRoutes);
app.use('/api/cardRoutes',cardRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})