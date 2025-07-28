const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBfmFZCI61NS9yH6a21uV0qOfR5rtMOc6c");

/**
 * Formats the structured prompt in a way Gemini understands to return
 * a single file combining JSX and CSS using inline styles, followed by an explanation.
 */
function formatStructuredPrompt(userPrompt) {
  return `
You are an expert React developer. Based on the prompt below, generate a **single React component file** using inline CSS (style objects in JS).

--- Prompt Start ---
${userPrompt}
--- Prompt End ---

✅ Output Format:
1. Give the complete code in **one single file** using JSX + inline styles.
2. After the code block, give a clear **step-by-step explanation** of how the code works.

Use this exact format:
\`\`\`jsx
// Component code here
\`\`\`

**Explanation:**
- Point 1
- Point 2
- etc.
`;
}

async function callGemini(history) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chat = model.startChat({ history });

    const userPrompt = history[history.length - 1].parts[0].text;
    const formattedPrompt = formatStructuredPrompt(userPrompt);

    const result = await chat.sendMessage(formattedPrompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to get response from Gemini");
  }
}

module.exports = {
  callGemini
};
