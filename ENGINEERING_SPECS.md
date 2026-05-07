# Neural Expansion Engine: Engineering Specifications

This document outlines the technical architecture and API integration requirements for the **PromptBook Neural Expansion Core**. The goal is to transform primitive creative concepts into high-fidelity, data-backed architectural specifications.

## 1. System Overview
The expansion engine acts as a **Semantic Transformer**. It ingests sparse user data (Niche, Problem, Concept) and outputs a structured "Idea Blueprint" consisting of:
- **Expanded Concept**: High-fidelity architectural/stylistic description.
- **Problem Amplification**: Professional reframing of the user's creative challenge.
- **Neural Stats**: Derived data points (Complexity Index, Stylistic Tokens, Throughput).
- **Export Artifact**: A portable document (PDF/MD) for professional distribution.

## 2. API Architecture

### A. Core Synthesis (OpenAI / LLM)
**Endpoint**: `https://api.openai.com/v1/chat/completions`  
**Model**: `gpt-4-turbo` or `gpt-4o` (for high-fidelity architectural reasoning).

**Payload Schema**:
```json
{
  "niche": "string",
  "problem_statement": "string",
  "core_concept": "string",
  "features": ["string"]
}
```

**System Prompt Logic**:
> "You are a Senior Neural Architect. Transform the following [Niche] and [Concept] into a high-fidelity Midjourney-ready prompt. Additionally, amplify the [Problem Statement] into a professional executive summary. Provide 3-4 'Neural Stats' that measure the stylistic complexity of the output."

### B. Document Export (Browser/Node)
**Requirement**: Generate a professional .md or .pdf file from the AI output.
- **MD Export**: Client-side blob generation.
- **PDF Export**: Implement using `jsPDF` or `react-to-pdf` to maintain the premium brand aesthetic.

## 3. Data Schema (The "Blueprint")
The AI response must be parsed into the following TypeScript interface:

```typescript
interface NeuralBlueprint {
  absolute_prompt: string;     // The final MJ / DALL-E command
  amplified_problem: string;   // Refined professional problem statement
  expanded_logic: string;      // The reasoning behind the stylistic choices
  stats: {
    complexity: number;        // 1-100 score
    tokens: number;           // Count of architectural tokens used
    cohesion_score: string;    // e.g. "98.4%"
  };
  export_metadata: {
    timestamp: string;
    node_id: string;
  };
}
```

## 4. Design Flow & UX (GSAP/3D)
The UI must maintain the **"Live Lab"** aesthetic during the API wait time:

1.  **Acquisition Phase**: User inputs Niche/Problem/Concept.
2.  **Parsing Phase (API CALL START)**: Trigger `Semantic Analysis` animation (GSAP scanning effect).
3.  **Synthesis Phase (API DATA RECEIVED)**: Trigger `Neural Branching` (SVG path animation).
4.  **Delivery Phase**: Map the `NeuralBlueprint` object to the final UI cards.

## 5. Security & Rate Limiting
- **Identity Bridge**: Ensure the `ConnectModal` validates the user session via Supabase/Auth before allowing high-tier synthesis.
- **Token Management**: Track usage against the user's plan (Free Trial: 3, Basic: 1k, etc.).

## 6. Implementation Checklist
- [ ] Connect `openai.ts` to the new `NeuralBlueprint` prompt logic.
- [ ] Implement `jsPDF` wrapper for the "Export Protocol" button.
- [ ] Bind the `ReversePromptFlow` and `IdeaExpanderFlow` result states to the API response.
- [ ] Add loading skeletons that mimic technical terminal readouts.

---
**Protocol Status**: READY_FOR_IMPLEMENTATION  
**Node ID**: PB-NX-6.0.2
