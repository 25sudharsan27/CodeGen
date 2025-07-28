const { callGemini } = require("./geminiService");
const { getSessionById, updateSession } = require("./sessionService");
const extractCodeParts = require("../utils/extractCodeParts");

class SessionManager {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.session = null;
  }

  async loadSession(user_id) {
    this.session = await getSessionById(this.sessionId, user_id);
    if (!this.session) throw new Error("Session not found");
  }

  buildChatHistory(prompt) {
    let history;

    if(this?.session?.chatHistory?.length >5){
        history = this.session.chatHistory.slice(-5).map((chat) => ({
        role: "user",
        parts: [{ text: chat.message }],
        }));
    }
    else if(this?.session?.chatHistory){
        history = this.session.chatHistory.map((chat) => ({
            role: "user",
            parts: [{ text: chat.message }],
        }));
    }
    else{
        history=[];
    }

    history.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    return history;
  }

  async getAIResponse(prompt) {
    const history = this.buildChatHistory(prompt);
    const response = await callGemini(history);
    return response;
  }

  updateSession(prompt, response) {
    const { jsx,explanation } = extractCodeParts(response);
    this.session.chatHistory.push({
      message: prompt,
      timestamp: new Date(),
      explanation: explanation,
      componentCode: [
        {
            filename:"Component.jsx",
            jsx
        }
      ]
    });

    this.session.lastUpdated = new Date();
    return { jsx, explanation };
  }

  async save() {
    return await updateSession(this.sessionId, this.session);
  }
}

module.exports = SessionManager;
