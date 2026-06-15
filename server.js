import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import githubRoutes from "./routes/githubRoutes.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "UPDATE", "DELETE"]
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
    res.send("Server started running");
});

// api endpoints
app.use("/api/github", githubRoutes);

const startServer = async () => {

    try {

        const connection = await pool.getConnection();

        console.log("Railway MySQL Connected Successfully");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server started running on PORT ${PORT}`);
        })

    } catch (error) {
        console.error("Database Connection Failed");
        console.error(error.message);
    }
}

startServer();