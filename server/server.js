import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.OPENAI_API_KEY
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Hello, world"
    });
});

app.post("/", async (req, res) => {
    try {
        const promt = req.body.promt;
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct-0914",
            prompt: `${promt}`,
            temperature: 1,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        console.log("Resultado", response.choices[0].text);
        res.status(200).send({
            bot: response.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(3000, () => console.log("Server listening on port http://localhost:3000")
)
