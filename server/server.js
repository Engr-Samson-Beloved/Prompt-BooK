import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  try {

    const { subject, style } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",

      messages: [
        {
          role: "system",
          content: "You are a world-class AI prompt engineer.",
        },
        {
          role: "user",
          content: `
Create a cinematic AI image prompt.

Subject: ${subject}
Style: ${style}

Return only the final prompt.
          `,
        },
      ],
    });

    res.json({
      result: completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "OpenAI request failed",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});