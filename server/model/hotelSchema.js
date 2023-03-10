import mongoose, { Schema } from "mongoose";

const hotelSchema= new mongoose.Schema({
    ownerId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'owners',
    },
    hotelname:{
        type: String,
        required: true,
        trim:true,
    },
    description:{
        type:String
    },
    totalrooms:{
        type:Number
    },
    contact:{
        type:String
    },
    price:{
        type:Number
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:String
    },
    photo1:{
        type:String
    },
    photo2:{
        type:String
    },
    photo3:{
        type:String
    },

    fesility:Array,

    location:{
        type:String
    },
    longitude:{
        type:Number
    },
    latitude:{
        type:Number
    },
    reviews:[{
        username:{
            type:String,
        },
        userphoto:{type:String},
        feedback:{type:String},
        stars:{type:String}
    }],
    isApproved:{type:Boolean, default:false},
    isAdminBanned:{type:Boolean, default:false},
    isOwnerStoped:{type:Boolean, default:false},
},
{
    timestamps:true,
}
)

const hotelmodel=mongoose.model('hotels',hotelSchema)
export default hotelmodel