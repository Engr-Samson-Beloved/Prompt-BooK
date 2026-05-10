# WhatsApp Agentic Ecosystem: Implementation Plan

This document outlines the technical roadmap for integrating the Official WhatsApp Business Cloud API into the **Founder's Co-Pilot** platform, enabling autonomous "Social Twins" for multi-tenant deployment.

## 🏗️ Architecture Overview

The system follows a **Webhook-based Multi-Tenant Architecture**:
- **Frontend**: React-based "Hire Agent" module for persona definition and QR/Connect logic.
- **Backend**: Node.js `whatsapp-server.js` acting as a "Neural Bridge."
- **AI Core**: Gemini 2.0 Flash/Lite for semantic response generation.
- **Persistence**: Database (Supabase/Postgres) to map Meta `phone_number_id` to specific founder personas.

---

## 📅 Phase 1: Neural Handshake (CURRENT)
**Goal**: Establish a bidirectional communication loop between WhatsApp and the AI.

- [x] **Scaffold `whatsapp-server.js`**: Implement Express endpoints for Webhook verification and message listening.
- [x] **Environment Sync**: Configure `.env` with `WHATSAPP_TOKEN` and `VERIFY_TOKEN`.
- [ ] **Manual Handshake**: Establish the first successful connection via Meta Developer Portal and Ngrok.
- [ ] **AI Loop**: Link the incoming message text to the `gemini.ts` logic.

---

## 📅 Phase 2: Platform Infrastructure
**Goal**: Support multiple founders with unique personalities.

- [ ] **Database Integration**: Create a mapping table for `Founder_ID` -> `WhatsApp_Account_ID`.
- [ ] **Persona Injection**: Modify the AI prompt to include the specific "Social Twin" instructions (Tone, Niche, Capability).
- [ ] **Thread History**: Implement message caching to give the AI short-term memory of the conversation.

---

## 📅 Phase 3: Scaling & Cost Control
**Goal**: Manage resource consumption and Meta conversation quotas.

- [ ] **Conversation Monitor**: Track the 24-hour "Free Conversation" window provided by Meta.
- [ ] **Automatic Throttling**: Limit AI processing for accounts that exceed daily quotas.
- [ ] **Serverless Migration**: Move the Node.js server to Vercel for $0 hosting cost.

---

## 🛠️ Technical Setup Instructions

### 1. Meta Developer Portal
1. Create a "Business App" on [developers.facebook.com](https://developers.facebook.com).
2. Add the **WhatsApp** product.
3. Note the **Temporary Access Token** and **Phone Number ID**.
4. Set the Webhook URL to your Ngrok/Deployment URL.

### 2. Local Development
1. `npm install express axios dotenv`
2. `node whatsapp-server.js`
3. `ngrok http 3000`

### 3. Production Deployment
1. Push `whatsapp-server.js` to a Vercel/Railway repo.
2. Configure Environment Variables in the hosting dashboard.

---

## ⚠️ Known Constraints
- **Business Only**: Requires a WhatsApp Business Account (cannot be a standard personal account).
- **Meta Verification**: Full production deployment requires Facebook Business Manager verification.
- **Media Handling**: Current MVP only supports text; images/voice require additional logic for Meta Media IDs.
