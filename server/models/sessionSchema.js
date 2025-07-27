const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    message : String, 
    timestamp: {type:Date, default:Date.now},
    componentCode:{
        jsx:String,
        css:String,
        explanation:String
    }
})

const sessionSchema = new mongoose.Schema(
    {
        userId : mongoose.Schema.Types.ObjectId,
        sessionName: String,
        chatHistory: [ChatSchema],
        lastUpdated : {
            type:Date,
            default:Date.now
        }
    }
)

module.exports = mongoose.model('Session',sessionSchema);