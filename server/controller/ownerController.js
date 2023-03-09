import ownermodel from "../model/ownerSchema.js";
import hotelmodel from "../model/hotelSchema.js";
import bookingmodel from "../model/bookingSchema.js"
import adminModel from "../model/adminSchema.js";
import { otpSend,otpVerify } from '../utils/twilio.js'
import { generateOwnerToken,verifyToken } from '../middlewares/jwt.js'

import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import moment from "moment/moment.js";
export async function ownerSignup(req,res,next){
    try {
        let obj=req.body
        let user= await ownermodel.findOne({email:obj.email})
        if (!user) {
            obj.password= await bcrypt.hash(obj.password, 10)
            await ownermodel.create({
                firstname:obj.firstname,
                lastname:obj.lastname,
                email:obj.email,
                phone:obj.phone,
                password:obj.password,
            })
            let ownerdetails=await ownermodel.findOne({email:obj.email})
            await otpSend(ownerdetails.phone)
            res.json({ "status": "success", "message": "signup success" ,ownerId:ownerdetails._id})
        } else {
            res.json({ "status": "failed", "message": "Email already registered" })
        }
    } catch (error) {
        console.log(error);
    }
}


export async function ownerOtpVerify(req,res,next){
    try {
        let obj=req.body
        let ownerDetails= await ownermodel.findOne({_id:obj.ownerId})
        const verify= await otpVerify(ownerDetails.phone,obj.otp)
        console.log(verify);
        if(verify === "approved"){
            ownerDetails.isVerify=true
            ownerDetails.save()
            res.json({ "status": "success", "message": "otp verification true"})
        }else{
            res.json({ "status": "failed", "message": "otp invalid!!"})
        }
    } catch (error) {
        console.log(error)
    }
}



export async function ownerLogin(req,res,next){
    try {
        let obj=req.body
        let owner= await ownermodel.findOne({email:obj.email})
        if (owner) {
            const isMatch = await bcrypt.compare(obj.password,owner.password)
            if (isMatch===true) {
                if(!owner.isBanned){
                    if (!owner.isVerify) {
                        await otpSend(owner.phone)
                        res.json({ "status": "otpsend", "message": "Otp send your phone",ownerId:owner._id})
                    } else {
                        const token=await generateOwnerToken(owner)
                        res.json({ "status": "success", "message": "login success","token":token ,"name":owner.firstname})
                    }
                }else{
                    res.json({ "status": "failed", "message": "Your account is blocked!!"})
                }
            } else {
                res.json({ "status": "failed", "message": "Password does not match"})
            }
        } else {
            res.json({ "status": "failed", "message": "Email not registered"})
        }
    } catch (error) {
        console.log(error)
    }
}


export async function getOwner(req,res,next){
    try {
        const ownerToken=req.headers["ownertoken"]
        const ownerId=await verifyToken(ownerToken)
        const owner=await ownermodel.findById(ownerId)
        res.json({status:"success" ,ownerName: owner.firstname,ownerEmail:owner.email})
    } catch (error) {
        console.log(error)
    }
}

export async function addHotel(req,res,next){
    try {
        let obj=req.body
        const ownerId=await verifyToken(obj.ownerToken)
        const hotel=await hotelmodel.create({
            ownerId:ownerId,
            hotelname:obj.hotelname,
            description:obj.description,
            totalrooms:obj.totalrooms,
            contact:obj.contact,
            price:obj.price,
            city:obj.city,
            state:obj.state,
            zip:obj.zip,
            photo1:obj.photo1,
            photo2:obj.photo2,
            photo3:obj.photo3,
            fesility:obj.fesility
        })
        res.json({status:"success",hotelId:hotel._id})
    } catch (error) {
        console.log(error)
    }
}

export async function addLocation(req,res,next){
    try {
        let obj=req.body
        await hotelmodel.findByIdAndUpdate(obj.hotelId,{
            location:obj.location,
            longitude:obj.longitude,
            latitude:obj.latitude
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function getOwnerHotel(req,res,next){
    try {
        const ownerId=req.ownerId
        const hotels=await hotelmodel.find({ownerId:ownerId})
        res.json({hotels:hotels})
    } catch (error) {
        console.log(error)
    }
}

export async function getEditHotel(req,res,next){
    try {
        const hotelId=req.params.id
        const hotel=await hotelmodel.findById(hotelId)
        res.json({status:"success",hotel:hotel})
    } catch (error) {
        console.log(error)
    }
}

export async function editHotel(req,res,next){
    try {
        let obj=req.body
        await hotelmodel.findByIdAndUpdate(obj.hotelId,{
            hotelname:obj.hotelname,
            description:obj.description,
            totalrooms:obj.totalrooms,
            contact:obj.contact,
            price:obj.price,
            city:obj.city,
            state:obj.state,
            zip:obj.zip,
            fesility:obj.fesility
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function deleteHotel(req,res,next){
    try {
        const hotelId=req.params.id
        await hotelmodel.findByIdAndDelete(hotelId)
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function hotelBann(req,res,next){
    try {
        const hotelId=req.params.id
        const hotel=await hotelmodel.findById(hotelId)
        hotel.isOwnerStoped=!hotel.isOwnerStoped
        await hotel.save()
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function fullDetails(req,res,next){
    try {
        const ownerId=req.ownerId
        const owner=await ownermodel.findOne({_id:ownerId})
        res.json({owner:owner})
    } catch (error) {
        console.log(error)
    }
}

export async function editProfile(req,res,next){
    try {
        const ownerId=req.ownerId
        let obj=req.body
        await ownermodel.findByIdAndUpdate(ownerId,{
            firstname:obj.firstname,
            lastname:obj.lastname,
            email:obj.email,
            phone:obj.phone,
            city:obj.city,
            state:obj.state,
            zip:obj.zip,
            profilephoto:obj.profilephoto,
            coverphoto:obj.coverphoto,
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function getBookings(req,res,next){
    try {
        const hotelId=req.params.id
        const bookings=await bookingmodel.find({hotelId:hotelId})
        const bookingCount=await bookingmodel.find({hotelId:hotelId}).count()
        const bookingsAmount=await bookingmodel.aggregate([
            {
                $match:{
                    hotelId:mongoose.Types.ObjectId(hotelId)  
                }
            },
            {
                $group:{
                    _id:null,
                    totalAmount:{$sum:"$totalprice"}
                }
            }
        ])
        res.json({bookings:bookings,bookingCount:bookingCount,totalAmount:bookingsAmount[0].totalAmount})
    } catch (error) {
        console.log(error)
    }
}

export async function getAdmins(req,res,next){
    try {
        const admins=await adminModel.find()
        res.json({admins:admins})
    } catch (error) {
        console.log(error)
    }
}

export async function getAdmin(req,res,next){
    try {
        const adminDetails=await adminModel.findById(req.params.adminId)
        res.json({adminDetails:adminDetails})
    } catch (error) {
        console.log(error)
    }
}

export async function myPhoto(req,res,next){
    try {
        const owner=await ownermodel.findById(req.params.ownerId)
        res.json({result:owner})
    } catch (error) {
        console.log(error)
    }
}

export async function ownerDashItems(req,res,next){
    try {
        const ownerId=req.ownerId
        let hotelIds= await hotelmodel.aggregate([
            {
                $match:{
                    ownerId:mongoose.Types.ObjectId(ownerId)
                }
            },
            { $project: { _id: 1 } }
        ])
        hotelIds = hotelIds.map(obj => obj._id);
        const bookings=await bookingmodel.aggregate([
            {
                $match:{
                    hotelId:{$in:hotelIds}
                }
            }
        ])
        const totalPayment=await bookingmodel.aggregate([
            {
                $match:{
                    hotelId:{$in:hotelIds}
                }
            },
            {
                $group: {
                    _id: null,
                    totalprice: { $sum: "$totalprice" }
                }
            }
        ])
        res.json({Totalbooking:bookings.length,Totalhotels:hotelIds.length,Totalamount:totalPayment[0].totalprice})
    } catch (error) {
        console.log(error)
    }
}


export async function ownerGraph(req,res,next){
    try {
        const ownerId=req.ownerId
        let hotelIds= await hotelmodel.aggregate([
            {
                $match:{
                    ownerId:mongoose.Types.ObjectId(ownerId)
                }
            },
            { $project: { _id: 1 } }
        ])
        hotelIds = hotelIds.map(obj => obj._id);
        let totalbookings=await bookingmodel.aggregate([
            {
                $match:{
                    hotelId:{$in:hotelIds}
                }
            },
            {
                $project: { _id:0,createdAt:1, totalprice:1 }
            }
        ])
        totalbookings=totalbookings.filter(obj=>{
            obj.createdAt = moment(obj.createdAt).format('MMMM');
            return obj
        })

        let month = [ 'January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'September' , 'October' , 'November' , 'December' ]
        for (let i = 0; i < month.length; i++) {
            let f = 0
            totalbookings.map((obj)=>{
                if (obj.createdAt === month[i]) {
                    f = f + obj.totalprice
                }
            })
            month[i] = f
        }
        res.json({monthSalery:month})
    } catch (error) {
        console.log(error)
    }
}