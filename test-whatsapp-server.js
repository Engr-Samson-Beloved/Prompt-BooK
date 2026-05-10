import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/webhook';
const VERIFY_TOKEN = 'neural_handshake_2026';

/**
 * 🧪 TEST 1: Webhook Verification (The Handshake)
 */
async function testVerification() {
  console.log('🧪 Testing Webhook Verification...');
  try {
    const response = await axios.get(`${SERVER_URL}`, {
      params: {
        'hub.mode': 'subscribe',
        'hub.verify_token': VERIFY_TOKEN,
        'hub.challenge': 'CHALLENGE_ACCEPTED_2026'
      }
    });
    
    if (response.data === 'CHALLENGE_ACCEPTED_2026') {
      console.log('✅ Verification Test Passed!');
    } else {
      console.log('❌ Verification Test Failed: Unexpected challenge response.');
    }
  } catch (error) {
    console.error('❌ Verification Test Errored:', error.message);
  }
}

/**
 * 🧪 TEST 2: Incoming Message Simulation
 */
async function testIncomingMessage() {
  console.log('\n🧪 Testing Incoming Message Simulation...');
  
  const mockPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: {
            display_phone_number: '123456789',
            phone_number_id: 'TEST_PHONE_NUMBER_ID'
          },
          contacts: [{
            profile: { name: 'Test User' },
            wa_id: '2348123456789'
          }],
          messages: [{
            from: '2348123456789',
            id: 'wamid.HBgNMjM0ODEyMzQ1Njc4OQYVAgIdHhA=',
            timestamp: Date.now().toString(),
            text: { body: 'Hello K-7! Can you help me with my brand strategy?' },
            type: 'text'
          }]
        },
        field: 'messages'
      }]
    }]
  };

  try {
    const response = await axios.post(SERVER_URL, mockPayload);
    
    if (response.status === 200) {
      console.log('✅ Incoming Message Simulated Successfully!');
      console.log('👀 Check your whatsapp-server.js terminal for AI response logs.');
    } else {
      console.log(`❌ Message Simulation Failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Message Simulation Errored:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Tip: Make sure your "node whatsapp-server.js" is running on port 3000.');
    }
  }
}

async function runTests() {
  await testVerification();
  await testIncomingMessage();
}

runTests();
