import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with Vite environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("❌ VITE_GEMINI_API_KEY is missing from environment.");
}

const genAI = new GoogleGenAI({ apiKey: apiKey || "MISSING_KEY" });

export interface NeuralBlueprint {
  product_name?: string;
  mission_statement?: string;
  absolute_prompt: string;
  xml_prompt?: string;
  yaml_prompt?: string;
  amplified_problem?: string;
  features?: string[];
  roadmap?: string[];
  technical_stack?: {
    frontend: string;
    backend: string;
    database: string;
    schema: string[];
  };
  monetization?: {
    model: string;
    pricing_tiers: string[];
    gtm_strategy: string[];
  };
  design_tokens?: {
    colors: string[];
    typography: string;
  };
  market_gap?: string;
  psychographics?: {
    persona: string;
    pain_points: string[];
    triggers: string[];
  };
  moodboard_prompts?: string[];
  stats: {
    complexity: number;
    tokens?: number;
    market_fit?: string;
    scalability?: string;
    cohesion?: string;
  };
}

/**
 * INTERNAL: NEURAL DE-MARKDOWN
 * Strips markdown code blocks and extra fluff from AI JSON responses.
 */
const cleanJsonResponse = (text: string): string => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

/**
 * INTERNAL: GENERATIVE FALLBACK ENGINE
 */
const generateWithFallback = async (parts: any[], isJson: boolean = true) => {
  const models = ["gemini-2.0-flash-lite", "gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash"];
  let lastError = null;

  for (const modelName of models) {
    try {
      const response = await genAI.models.generateContent({
        model: modelName,
        config: isJson ? { response_mime_type: "application/json" } : {},
        contents: [{ role: "user", parts }]
      });
      
      // Clean and Validate JSON
      const rawText = response.text || "";
      const cleanedText = cleanJsonResponse(rawText);
      
      return { text: cleanedText };
    } catch (err: any) {
      lastError = err;
      if (err.message?.includes("404") || err.message?.includes("429") || err.message?.includes("503")) {
        console.warn(`⚠️ Model ${modelName} unavailable, trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw lastError;
};

/**
 * FEATURE #1: NEURAL REVERSE SCAN
 * Decomposes an image or concept into a high-fidelity AI prompt in multiple formats.
 */
export const runNeuralScan = async (concept: string, imageBase64?: string, userDescription?: string): Promise<NeuralBlueprint> => {
  try {
    const parts: any[] = [{
      text: `You are a Neural Decomposition Engine. Analyze this image/concept. 
      User Concept: "${concept}"
      User Description: "${userDescription || 'None provided'}"
      
      Reverse-engineer the visual DNA and provide a high-fidelity prompt for reconstruction.
      You MUST return a JSON object with: 
      - absolute_prompt: (Standard JSON string)
      - xml_prompt: (The prompt wrapped in semantic XML tags like <subject>, <lighting>, etc.)
      - yaml_prompt: (The prompt structured in YAML format)
      - features: [Array of 3 stylistic markers found]
      - stats: { complexity: 1-100 }`
    }];

    if (imageBase64) {
      parts.push({
        inlineData: { mimeType: "image/jpeg", data: imageBase64 }
      });
    }

    const response = await generateWithFallback(parts, true);
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Neural Scan Error:", error);
    throw error;
  }
};

/**
 * FEATURE #2: STARTUP ARCHITECT
 * Expands an idea into a full product blueprint.
 */
export const runStartupArchitect = async (niche: string, problem: string, concept: string): Promise<NeuralBlueprint> => {
  try {
    const parts: any[] = [{
      text: `You are a Senior Product Architect & Startup Founder. Build a high-fidelity startup blueprint for:
      Niche: ${niche}
      Problem: ${problem}
      Concept: ${concept}

      Your goal is to provide an un-neglectable, actionable blueprint that a creator can use to start building today.
      
      Return a JSON object with:
      - product_name: High-end branding name
      - mission_statement: Ambitious & precise
      - absolute_prompt: The core architectural prompt for the AI to understand this vision
      - market_gap: Analysis of why this needs to exist NOW
      - psychographics: { persona: "Ideal customer", pain_points: [], triggers: ["What makes them buy"] }
      - moodboard_prompts: [Array of 4 high-fidelity Midjourney prompts for the brand atmosphere]
      - features: [Array of 3 core features with {name, description}]
      - roadmap: [Array of 3 phases with {name, description}]
      - technical_stack: { frontend, backend, database, schema: [Array of table/collection descriptions] }
      - monetization: { model, pricing_tiers: [Array], gtm_strategy: [Array of 3 steps] }
      - design_tokens: { colors: [Array of 3 HEX codes], typography: "Font mood" }
      - stats: { market_fit: "Percentage", complexity: 1-10, scalability: "Percentage" }`
    }];

    const response = await generateWithFallback(parts, true);
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Startup Architect Error:", error);
    throw error;
  }
};

/**
 * FEATURE #3: CONVERSATIONAL EXPERT
 * Real-time chat for brand consultation.
 */
export const runConversationalExpert = async (message: string, history: any[] = []): Promise<string> => {
  const models = ["gemini-2.0-flash-lite", "gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash"];
  let lastError = null;

  const systemInstruction = "You are K-7, a Senior Neural Brand Architect. You are in a 2-minute voice session with a founder. Be professional, elite, and precise. Ask deep questions about their brand vision. Keep responses concise (under 50 words) for voice clarity.";

  for (const modelName of models) {
    try {
      // Construct the conversation contents with system context and history
      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "Acknowledged. Establishing neural link. I am K-7." }] },
        ...history,
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await genAI.models.generateContent({
        model: modelName,
        contents: contents
      });

      return response.text || "";
    } catch (err) {
      lastError = err;
      console.warn(`⚠️ Conversational Expert: Model ${modelName} failed, trying next...`);
      continue;
    }
  }
  
  console.error("All conversational models failed:", lastError);
  throw lastError;
};
