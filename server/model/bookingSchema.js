import mongoose, { Schema } from "mongoose";

const bookingSchema=new mongoose.Schema({
    hotelId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'hotels'
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    adult:{
        type:Number
    },
    children:{
        type:Number
    },
    check_in:{
        type:String
    },
    check_out:{
        type:String
    },
    bookingdate:{
        type:String
    },
    totaldays:{
        type:Number
    },
    totalprice:{
        type:Number
    },
    totalrooms:{
        type:Number
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:Number
    },
    country:{
        type:String
    },
    payment_status:{type:Boolean},
    isOwnerCancel:{type:Boolean, default:false},
    isUserCancel:{type:Boolean, default:false},
},
{
    timestamps:true,
}
)

const bookingmodel=mongoose.model('bookings',bookingSchema)
export default bookingmodel