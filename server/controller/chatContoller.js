import chatmodal from '../model/chatSchema.js'

export async function createChat(req,res,next){
    try {
        const chat=await chatmodal.findOne({
            members:{$all:[req.body.senderId,req.body.receiverId]}
        })
        if(!chat){
            const newChat=await chatmodal.create({
                members:[req.body.senderId,req.body.receiverId]
            })
            res.json({status:"success",result:newChat})
        }else{
            res.json({status:"failed",result:chat})
        }
    } catch (error) {
        console.log(error);
    }
}


export async function ownerChats(req,res,next){
    try {
        const chats=await chatmodal.find({
            members:{$in:[req.params.ownerId]}
        })
        res.json({status:"success",chatbox:chats})
    } catch (error) {
        console.log(error);
    }
}

export async function findChat(req,res,next){
    try {
        const chat=await chatmodal.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.json({status:"success",chatlist:chat})
    } catch (error) {
        console.log(error);
    }
}