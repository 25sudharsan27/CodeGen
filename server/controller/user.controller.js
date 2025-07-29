const session = require("../models/sessionSchema");
const SessionManager = require("../services/sessionmanager");
const {createSession} = require('../services/sessionService');


const getSessions = async (req, res) => {
  try {
    const id = req.user_id;

    const sessions = await session.find({ userId: id }).sort({ lastUpdated: -1 }) .select("_id sessionName lastUpdated");

    return res.status(200).json({
      success: true,
      error: false,
      sessions,
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

const getchat = async (req,res)=>{
    try{
        const id=req.user_id;
        const {sessionId} = req.params;
        const sessiond = await session.findOne({userId:id,_id:sessionId});

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
}

const deleteSession = async (req, res) => {
    const { sessionId } = req.params;
    console.log(sessionId+" hi ");
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
    if(!req.user_id){
        return res.status(401).json({error:true,success:false,message:"user id was not authenticated"});
    }
    try {
      let manager;
      if (!sessionId) {
        const newSession = await createSession(req.user_id,prompt);
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
  
      res.status(201).json({ sessionId, jsx, explanation, lastUpdated: updated.lastUpdated });
    } catch (err) {
      console.error("Prompt Handler Error:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {getSessions,getchat,handlePrompt,deleteSession};