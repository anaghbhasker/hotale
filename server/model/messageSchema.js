import mongoose, { Schema } from "mongoose";

const messageSchema=new mongoose.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String
    },
    text: {
        type: String,
    }
},
    {
        timestamps: true,
    }
)

const messagemodel=mongoose.model("messages",messageSchema)
export default messagemodel;