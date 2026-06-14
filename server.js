import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    origin : "*",
    methods : ["GET", "PUT", "POST", "UPDATE", "DELETE"]
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/test", (req , res) => {
    res.send("Server started running");
});

app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`));