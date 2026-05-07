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
  amplified_problem?: string;
  features?: string[];
  roadmap?: string[];
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
      text: `You are a Senior Product Architect. Build a startup blueprint for:
      Niche: ${niche}
      Problem: ${problem}
      Concept: ${concept}

      Return JSON with:
      - product_name: High-end branding
      - mission_statement: Professional & Ambitious
      - absolute_prompt: The core architectural prompt
      - features: [Array of 3 core features]
      - roadmap: [Array of 3 phases]
      - stats: { market_fit: "High/Med/Low", complexity: "Level 1-10", scalability: "Percentage" }`
    }];

    const response = await generateWithFallback(parts, true);
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Startup Architect Error:", error);
    throw error;
  }
};
