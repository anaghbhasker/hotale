import mongoose, { Schema } from "mongoose";

const tokenSchema= new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users',
        unique:true,
    },
    token:{type:String,required:true}
},
{
    timestamps:true,
}
)

const tokenmodel=mongoose.model('tokens',tokenSchema)
export default tokenmodel