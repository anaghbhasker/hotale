import mongoose, { Schema } from "mongoose";

const bookingSchema=new mongoose.Schema({
    roomId:{
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
        type:Date
    },
    check_out:{
        type:Date
    },
    totaldays:{
        type:Number
    },
    bookingdate:{
        type:Date
    },
    totalprice:{
        type:Number
    },
    payment_status:{type:Boolean, default:false},
    isOwnerCancel:{type:Boolean, default:false},
    isUserCancel:{type:Boolean, default:false},
},
{
    timestamps:true,
}
)

const bookingmodel=mongoose.model('bookings',bookingSchema)
export default bookingmodel