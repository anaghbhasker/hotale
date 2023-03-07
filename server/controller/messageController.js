import messagemodel from '../model/messageSchema.js'

export async function addMessage(req,res,next){
    try {
        const { chatId , senderId ,text }=req.body
        const message= await messagemodel.create({
            chatId:chatId,
            senderId:senderId,
            text:text
        })
        res.json({status:"success",result:message})
    } catch (error) {
        console.log(error);
    }
}


export async function getMessage(req,res,next){
    try {
        const { chatId }=req.params
        const result= await messagemodel.find({chatId:chatId})
        res.json({status:"success",result:result})
    } catch (error) {
        console.log(error);
    }
}