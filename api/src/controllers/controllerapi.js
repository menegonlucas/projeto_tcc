// routes/books.js
import express from "express";
import fetch from "node-fetch"; // se estiver no Node 18+, já pode usar fetch direto
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/search", async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "Informe o termo de busca (q)" });
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
});

export default router;
