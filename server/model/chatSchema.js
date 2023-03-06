import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        members: {type: Array},
    },
    {
        timestamps: true,
    }
);

const chatmodal = mongoose.model("chats", chatSchema);
export default chatmodal;
