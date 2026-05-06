import { OpenAI } from "openai";

const openai = new OpenAI({
  // Vite looks into your .env file for this specific name
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

export const getAbsolutePrompt = async (subject: string, style: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        { 
          role: "system", 
          content: "You are a master prompt engineer. Take the user's input and expand it into a high-end Midjourney prompt. Return ONLY a JSON object with the field 'refined'." 
        },
        { role: "user", content: `Subject: ${subject}, Style: ${style}` }
      ],
      response_format: { type: "json_object" } 
    });

    const data = JSON.parse(completion.choices[0].message.content || "{}");
    return data.refined; 
  } catch (error) {
    console.error("API Error:", error);
    return "Error: Check your API credits or key!";
  }
};
