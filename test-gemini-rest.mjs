import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Check if fetch is available in Node 18+ or needs polyfill

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function testREST() {
  console.log('\x1b[35m%s\x1b[0m', '📡 PINGING GEMINI 1.5 PRO (REST API)...');
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [{
      parts: [{
        text: "You are a Senior Product Architect. Give me a 1-sentence professional vision for a space-based glass city."
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('\x1b[31m%s\x1b[0m', '❌ REST FAILED:');
      console.error(JSON.stringify(data.error, null, 2));
    } else {
      console.log('\x1b[32m%s\x1b[0m', '✅ REST SUCCESS!');
      console.log('\x1b[33m%s\x1b[0m', 'Vision:', data.candidates[0].content.parts[0].text);
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ FETCH ERROR:');
    console.error(error.message);
  }
}

testREST();
