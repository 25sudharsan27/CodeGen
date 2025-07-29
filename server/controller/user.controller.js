const session = require("../models/sessionSchema");
const SessionManager = require("../services/sessionmanager");
const {createSession} = require('../services/sessionService');

const { promisify } = require("util");
const redisClient = require("../utils/redis");

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getSessions = async (req, res) => {
    try {
      const id = req.user_id;
      const cacheKey = `sessions:${id}`;
      console.log("User ID:", id, "Cache Key:", cacheKey);
  
      try {
        const cached = await getAsync(cacheKey);
        console.log("Redis GET Result:", cached);
  
        if (cached) {
          return res.status(200).json({
            success: true,
            error: false,
            sessions: JSON.parse(cached),
            fromCache: true,
          });
        }
      } catch (redisErr) {
        console.error("Redis GET Error:", redisErr);
      }
  
      const sessions = await session.find({ userId: id })
        .sort({ lastUpdated: -1 })
        .select("_id sessionName lastUpdated");
  
      try {
        await setAsync(cacheKey, JSON.stringify(sessions), 'EX', 300);
        console.log("Redis SET success");
      } catch (redisErr) {
        console.error("Redis SET Error:", redisErr);
      }
  
      return res.status(200).json({
        success: true,
        error: false,
        sessions,
      });
  
    } catch (error) {
      console.log("Handler Error:", error);
      return res.status(500).json({
        error: true,
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  const getchat = async (req, res) => {
    try {
      const id = req.user_id;
      const { sessionId } = req.params;
      const cacheKey = `chat:${id}:${sessionId}`;
  
      const cached = await getAsync(cacheKey);
      if (cached) {
        return res.status(200).json({
          success: true,
          error: false,
          sessiond: JSON.parse(cached),
          fromCache: true
        });
      }
  
      const sessiond = await session.findOne({ userId: id, _id: sessionId });
      await setAsync(cacheKey, JSON.stringify(sessiond), 'EX', 60 * 10); // Cache for 10 mins
  
      return res.status(200).json({
        success: true,
        error: false,
        sessiond,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  const deleteSession = async (req, res) => {
    const { sessionId } = req.params;
    if (!req.user_id) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "User ID was not authenticated"
      });
    }
  
    try {
      const deletedSession = await session.findOneAndDelete({
        _id: sessionId,
        userId: req.user_id,
      });
  
      if (!deletedSession) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "Session not found or already deleted"
        });
      }
  
      // Invalidate caches
      await delAsync(`sessions:${req.user_id}`);
      await delAsync(`chat:${req.user_id}:${sessionId}`);
  
      return res.status(200).json({
        error: false,
        success: true,
        message: "Deleted successfully"
      });
  
    } catch (err) {
      console.error("Delete Session Error:", err);
      return res.status(500).json({
        error: true,
        success: false,
        message: err.message
      });
    }
  };
  
  const handlePrompt = async (req, res) => {
    let { sessionId, prompt } = req.body;
    if (!req.user_id) {
      return res.status(401).json({ error: true, success: false, message: "user id was not authenticated" });
    }
    try {
      let manager;
      if (!sessionId) {
        const newSession = await createSession(req.user_id, prompt);
        sessionId = newSession._id;
        manager = new SessionManager(sessionId);
        manager.session = newSession;
      } else {
        manager = new SessionManager(sessionId);
        await manager.loadSession(req.user_id);
      }
  
      const response = await manager.getAIResponse(prompt);
      const { jsx, explanation } = manager.updateSession(prompt, response);
  
      const updated = await manager.save();
  
      // Invalidate related caches
      await delAsync(`sessions:${req.user_id}`);
      await delAsync(`chat:${req.user_id}:${sessionId}`);
  
      res.status(201).json({ sessionId, jsx, explanation, lastUpdated: updated.lastUpdated });
    } catch (err) {
      console.error("Prompt Handler Error:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
module.exports = {getSessions,getchat,handlePrompt,deleteSession};