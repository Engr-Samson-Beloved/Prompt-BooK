import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function runNeuralScan() {
  console.log('\x1b[36m%s\x1b[0m', '📡 INITIALIZING NEURAL SCAN (FEATURE #1)...');

  const systemPrompt = `
    You are a Neural Decomposition Engine. 
    Analyze the user's concept and return a high-fidelity Midjourney prompt along with its constituent metadata.
    You MUST return ONLY a JSON object.
  `;

  const concept = "A futuristic library where books are holograms and the floor is water.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      config: { 
        response_mime_type: "application/json" // Native JSON enforcement
      },
      contents: [{ 
        role: "user", 
        parts: [{ text: `${systemPrompt}\n\nConcept: ${concept}\n\nRequired JSON fields:\n- absolute_prompt\n- lighting_vectors (array)\n- material_tokens (array)\n- neural_complexity (1-100)` }] 
      }]
    });
    
    const data = JSON.parse(response.text);
    
    console.log('\x1b[32m%s\x1b[0m', '✅ SCAN COMPLETE:');
    console.log('\x1b[37m%s\x1b[0m', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ SCAN FAILED:');
    console.error(error.message);
  }
}

runNeuralScan();
