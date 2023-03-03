import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    phone:{
        type: String
    },
    password: {
        type: String,
        trim:true,
        required: true,
    },
    city:{type:String},
    state:{type:String},
    country:{type:String},
    profilephoto:{type:String},
    coverphoto:{type:String},
    isBanned:{type:Boolean, default:false},
    isVerify:{type:Boolean, default:false}
},
{
    timestamps:true,
}
)

const usermodel=mongoose.model('users',userSchema)
export default usermodel