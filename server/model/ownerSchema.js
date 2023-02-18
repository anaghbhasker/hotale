import mongoose from "mongoose";


const ownerSchema= new mongoose.Schema({
    firstname:{type:String,required:true,trim:true},
    lastname:{type:String,required:true,trim:true},
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    phone:{
        type:String
    },
    password:{
        type: String,
        trim:true,
        required: true,
    },
    isBanned:{type:Boolean, default:false},
    isVerify:{type:Boolean, default:false}

},
{
    timestamps:true,
}
)

const ownermodel=mongoose.model('owners',ownerSchema)
export default ownermodel