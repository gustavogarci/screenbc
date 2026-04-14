# PRD Option 4: HealthText BC (The SMS/WhatsApp Native Approach)

## The Core Concept
Zero friction. No apps to download. No passwords to forget. No complex Health Gateway to navigate. The entire screening workflow happens via SMS or WhatsApp, powered by a conversational AI agent that is strictly bounded by clinical guidelines. 

**Why it wins:** Accessibility and UX. It acknowledges that the people most likely to fall through the cracks of the healthcare system are the least likely to navigate a complex government web portal. 

## 1. User Journey (Demo Flow)
1. **The Outbound Nudge:** The system identifies a patient turning 50 from the registry. It sends an SMS: *"Hi John, this is BC Health Preventative Services. You recently turned 50, which means you're due for a routine health screening. Would you like us to send a lab form to your phone? Reply YES."*
2. **The AI Conversation:** 
    *   John: "YES. What is this for?"
    *   HealthText AI: "Great! This is a routine check for your blood sugar, cholesterol, and kidney function. It's fully covered by MSP. Here is your digital requisition [Link]. You can show this on your phone at any LifeLabs."
3. **The Lab Visit (Simulated):** John takes the test. Developer clicks the "Simulate Lab Result" trigger.
4. **The Results Delivery:** 
    *   HealthText AI: *"Your lab results are back, John. Good news: your kidney function and cholesterol are perfectly normal. However, your blood sugar is slightly elevated (pre-diabetes range). Reply SUMMARY to get a detailed breakdown, or reply CALL to be connected to a telehealth nurse."*
    *   John: "SUMMARY"
    *   HealthText AI streams back a friendly, bulleted list of lifestyle interventions generated specifically for his exact lab values.

## 2. Technical Architecture & Mock Services
*   **The Interface:** A mock mobile phone UI frame on the screen showing an iMessage or WhatsApp conversation.
*   **Vercel AI SDK (Chat Interface):** Use the `useChat` hook, but style it to look exactly like an SMS thread. 
*   **The AI Persona (System Prompt):** The LLM must be tightly prompted to act as a BC Health navigator. It cannot diagnose. It can only explain pre-approved screening criteria and interpret received lab results based on strict thresholds.
*   **State Management:** The chat needs to maintain state (e.g., knowing if the requisition was sent, knowing when to simulate the lab result arriving).

## 3. Developer Execution Plan (Tomorrow)
*   [ ] **Phase 1: Chat UI.** Build a mobile-first chat interface using Tailwind that mimics iMessage. 
*   [ ] **Phase 2: The Agent Logic.** Set up the Vercel AI SDK. Write the system instructions: *"You are HealthText BC. Guide the user through receiving a requisition..."*
*   [ ] **Phase 3: Tool Calling (Crucial).** Implement AI SDK Tool Calling. The LLM should have a tool called `generate_requisition` that outputs a UI component (a card with a barcode/PDF link) directly into the chat stream.
*   [ ] **Phase 4: Tool Calling 2.** Implement a `check_lab_results` tool that the LLM can call after the developer triggers the simulation, allowing the LLM to read the mock CSV data and explain it to the user in the chat.

## 4. Pitch Angle
*"The biggest barrier to preventative healthcare isn't a lack of medicine; it's friction. We are asking unattached patients to navigate a labyrinth to get basic bloodwork. HealthText BC meets patients exactly where they are—on their phones. It turns a complex healthcare process into a simple text conversation, drastically increasing screening compliance."*