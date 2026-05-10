import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "neural_handshake_2026";
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * 🤝 STEP 1: Webhook Verification (The Handshake)
 */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

/**
 * 📩 STEP 2: Incoming Message Listener
 */
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    if (body.entry && 
        body.entry[0].changes && 
        body.entry[0].changes[0].value.messages && 
        body.entry[0].changes[0].value.messages[0]) {

      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from; 
      const msgText = message.text?.body; 
      const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;

      if (!msgText) return res.sendStatus(200);

      console.log(`📨 Received from ${from}: "${msgText}"`);

      try {
        // 🧠 Trigger Gemini AI Logic
        const aiResponse = await generateSocialResponse(msgText);
        
        console.log(`🤖 AI Response: "${aiResponse}"`);
        
        // 📤 Send WhatsApp Message
        await sendWhatsAppMessage(phone_number_id, from, aiResponse);
      } catch (error) {
        console.error('❌ Error in AI/WhatsApp flow:', error.message);
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

/**
 * 🧠 AI Engine: Generate Social Response
 */
async function generateSocialResponse(userMessage) {
  try {
    const model = "gemini-2.0-flash-lite";
    const prompt = `
      You are the S-4 Social Twin, an elite autonomous digital agent for a high-performance founder.
      Role: Manage communication with zero stress, absolute accuracy, and zero latency.
      Context: The user sent you this message on WhatsApp: "${userMessage}"
      
      Instructions:
      - Respond with a professional yet concise tone.
      - If it's a customer query, be helpful and brand-aware.
      - If it's a casual greeting, be friendly but efficient.
      - Keep the response under 50 words unless detail is absolutely necessary.
      - Do not use hashtags or overly emotional emojis.
    `;

    const response = await genAI.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently calibrating my neural pathways. I will respond to your request shortly.";
  }
}

/**
 * 📤 Message Dispatcher
 */
async function sendWhatsAppMessage(phone_number_id, to, text) {
  return axios({
    method: "POST",
    url: `https://graph.facebook.com/v18.0/${phone_number_id}/messages`,
    data: {
      messaging_product: "whatsapp",
      to: to,
      text: { body: text },
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
    },
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Neural Bridge Server is live on port ${PORT}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});
