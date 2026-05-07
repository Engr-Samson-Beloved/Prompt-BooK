import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.VITE_OPENAI_API_KEY;
// Try lowercase fix
const fixedKey = apiKey.startsWith('Sk-') ? apiKey.replace('Sk-', 'sk-') : apiKey;

console.log('Testing with key:', fixedKey.substring(0, 10) + '...');

const openai = new OpenAI({
  apiKey: fixedKey,
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "hi" }],
    });
    console.log('SUCCESS with lowercase fix!');
  } catch (e) {
    console.log('FAILED again:', e.message);
  }
}
test();
