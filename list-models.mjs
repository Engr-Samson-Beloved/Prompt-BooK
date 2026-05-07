import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function listModels() {
  console.log('\x1b[35m%s\x1b[0m', '🔍 DISCOVERING AVAILABLE MODELS...');
  
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
       console.error(JSON.stringify(data.error, null, 2));
    } else {
       console.log('Available Models:');
       data.models.forEach(m => console.log(`- ${m.name}`));
    }
  } catch (e) {
    console.error(e.message);
  }
}

listModels();
