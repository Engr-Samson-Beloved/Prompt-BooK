import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: VITE_OPENAI_API_KEY is not defined in your .env file.');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey,
});

async function testConnection() {
  console.log('\x1b[36m%s\x1b[0m', '📡 Initializing Neural Connection Test...');
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say 'Neural Connection Established'" }],
      max_tokens: 10,
    });

    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Neural Connection Established!');
    console.log('\x1b[33m%s\x1b[0m', 'Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ CONNECTION FAILED:');
    console.error(error.message);
    
    if (error.status === 401) {
      console.error('\x1b[33m%s\x1b[0m', 'Tip: Your API key appears to be invalid.');
    } else if (error.status === 429) {
      console.error('\x1b[33m%s\x1b[0m', 'Tip: You have exceeded your quota or rate limit.');
    }
  }
}

testConnection();
