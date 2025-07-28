const Session = require("../models/sessionSchema");

async function getSessionById(sessionId,user_id) {
  try {
    return await Session.findOne({_id:sessionId,userId:user_id});
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
}

async function updateSession(sessionId, updatedSession) {
  try {
    return await Session.findByIdAndUpdate(sessionId, updatedSession, { new: true });
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
}

async function createSession(userId,prompt) {
  const newSession = new Session({
    sessionName: prompt.length > 13 ? prompt.substring(0,13) :  prompt,
    userId: userId,
    chatHistory: [],
    lastUpdated: new Date(),
  });

  return await newSession.save();
}

module.exports = {
  getSessionById,
  updateSession,
  createSession
};