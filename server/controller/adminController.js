import adminModel from '../model/adminSchema.js'
import usermodel from "../model/userSchema.js"
import ownermodel from "../model/ownerSchema.js";
import hotelmodel from '../model/hotelSchema.js'
import coupenmodel from '../model/coupenSchema.js';
import bookingmodel from '../model/bookingSchema.js'
import notificationmodal from '../model/notificationSchema.js'
import { generateAdminToken } from '../middlewares/jwt.js'
import moment from "moment/moment.js";


export async function adminLogin(req,res,next){
    try {
        let obj=req.body
        const admin=await adminModel.findOne({email:obj.email})
        if (admin) {
            if (admin.password===obj.password) {
                const token=await generateAdminToken(admin)
                res.json({status:"success",message:"Successfully logged in",token:token})
            } else {
                res.json({status:"failed",message:"Password is not matched"})
            }
        } else {
            res.json({status:"failed",message:"Your email is not registed"})
        }
    } catch (error) {
        console.log(error)
    }
}




export async function dashBoard(req,res,next){
    try {
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}



export async function getUsers(req,res,next){
    try {
        const users=await usermodel.find()
        res.json({users:users})
    } catch (error) {
        console.log(error)
    }
}

export async function getOwners(req,res,next){
    try {
        const owners =await ownermodel.find()
        res.json({owners:owners})
    } catch (error) {
        console.log(error)
    }
}

export async function userBlk(req,res,next){
    try {
        const userId=req.params.id
        const user=await usermodel.findById(userId)
        user.isBanned=!user.isBanned
        await user.save()
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function ownerBlk(req,res,next){
    try {
        const ownerId=req.params.id
        const owner=await ownermodel.findById(ownerId)
        owner.isBanned=!owner.isBanned
        await owner.save()
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function getHotel(req,res,next){
    try {
        const hotels=await hotelmodel.find()
        res.json({status:"success",hotels:hotels})
    } catch (error) {
        console.log(error)
    }
}

export async function hotelStatus(req,res,next){
    try {
        const hotelId=req.params.id
        const hotel= await hotelmodel.findById(hotelId)
        hotel.isApproved=!hotel.isApproved
        await hotel.save()
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function getThatHotel(req,res,next){
    try {
        const hotelId=req.params.id
        const hotel=await hotelmodel.findById(hotelId).populate('ownerId')
        res.json({hotel:hotel})
    } catch (error) {
        console.log(error)
    }
}

export async function admInBannHotel(req,res,next){
    try {
        const hotelId=req.params.id
        const hotel= await hotelmodel.findById(hotelId)
        hotel.isAdminBanned=!hotel.isAdminBanned
        hotel.save()
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function addCoupen(req,res,next){
    try {
        let obj=req.body
        const coupen=await coupenmodel.findOne({coupencode:obj.coupencode})
        if(!coupen){
            await coupenmodel.create({
                coupencode:obj.coupencode,
                discount:obj.discount,
                endDate:obj.enddate
            })
            res.json({status:"success"})
        }else{
            res.json({status:"failed"})
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getOwner(req,res,next){
    try {
        const owner=await ownermodel.findById(req.params.ownerId)
        res.json({ownerDetails:owner})
    } catch (error) {
        console.log(error)
    }
}

export async function getAdminDetails(req,res,next){
    try {
        const admin=await adminModel.findById(req.params.adminId)
        res.json({adminDetails:admin})
    } catch (error) {
        console.log(error)
    }
}

export async function getAllbookings(req,res,next){
    try {
        const bookings=await bookingmodel.find().populate('hotelId').populate('userId')
        let response = []
        bookings.forEach((booking) => {
            const val = {
                _id: booking._id,
                check_in: booking.check_in,
                check_out: booking.check_out,
                bookingdate: booking.bookingdate,
                totalprice: booking.totalprice,
                firstname: booking.userId.username,
                hotelName: booking.hotelId.hotelname
            }
            response.push(val)
        })
        res.json({totals:response})
    } catch (error) {
        console.log(error)
    }
}

export async function getadminDash(req,res,next){
    try {
        const users=await usermodel.find().count()
        const owners=await ownermodel.find().count()
        const hotels=await hotelmodel.find().count()
        const totalBookings=await bookingmodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalprice: { $sum: "$totalprice" }
                }
            }
        ])
        res.json({users:users,owners:owners,hotels:hotels,totalprice:totalBookings[0].totalprice})
    } catch (error) {
        console.log(error)
    }
}

export async function adminChart(req,res,next){
    try {
        let bookings=await bookingmodel.aggregate([
            {
                $project:{ _id:0,createdAt:1, totalprice:1 }
            }
        ])
        bookings=bookings.filter(obj=>{
            obj.createdAt = moment(obj.createdAt).format('MMMM');
            return obj
        })
        let month = [ 'January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August', 'September' , 'October' , 'November' , 'December' ]
        for (let i = 0; i < month.length; i++) {
            let f = 0
            bookings.map((obj)=>{
                if (obj.createdAt === month[i]) {
                    f = f + obj.totalprice
                }
            })
            month[i] = f
        }
        res.json({getChart:month})
    } catch (error) {
        console.log(error)
    }
}

export async function getNotification(req,res,next){
    try {
        const notification=await notificationmodal.find()
        res.json({notification:notification})
    } catch (error) {
        console.log(error)
    }
}

export async function deleteNotification(req,res,next){
    try {
        await notificationmodal.findByIdAndDelete(req.params.notifiId)
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

export async function thatBookings(req,res,next){
    try {
        const thatBookings=await bookingmodel.find({hotelId:req.params.hotelId})
        res.json({thatBookings:thatBookings})
    } catch (error) {
        console.log(error)
    }
}