import mongoose, { Schema } from "mongoose";

const coupenSchema=new mongoose.Schema({
    coupencode:{type:String},
    discount:{type:Number},
    endDate:Date,
    users:[{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
    ]
},
{
    timestamps:true,
}
)

const coupenmodel=mongoose.model('coupens',coupenSchema)
export default coupenmodel