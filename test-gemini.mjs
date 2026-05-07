import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function testStartupArchitect() {
  console.log('\x1b[35m%s\x1b[0m', '🧪 TESTING FEATURE #1: STARTUP ARCHITECT (Gemini 1.5 Pro)');
  
  const systemPrompt = `
    You are a Senior Product Architect. 
    Transform the following startup idea into a professional blueprint.
    Output MUST include:
    1. Product Name (High-end branding)
    2. Mission Statement (Professional & Ambitious)
    3. Core Feature Matrix (3 essential technical features)
    4. Execution Roadmap (3 Phases)
    5. Market Stats (Complexity, Scalability, Market Fit)
  `;

  const userConcept = "A city made of glass in space for orbital logistics.";
  const userNiche = "Architecture / Orbital Logistics";
  const userProblem = "Visual and structural cohesion in zero-G glass infrastructures.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ 
        role: "user", 
        parts: [{ text: `${systemPrompt}\n\nNiche: ${userNiche}\nProblem: ${userProblem}\nConcept: ${userConcept}` }] 
      }]
    });
    
    console.log('\x1b[32m%s\x1b[0m', '✅ GENESIS SUCCESSFUL:');
    console.log('\x1b[37m%s\x1b[0m', response.text);
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ GENESIS FAILED:');
    console.error(error.message);
  }
}

testStartupArchitect();
