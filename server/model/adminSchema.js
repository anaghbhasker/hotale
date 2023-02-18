import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps:true,
}
)

const adminModel=mongoose.model('admins',adminSchema)
export default adminModel