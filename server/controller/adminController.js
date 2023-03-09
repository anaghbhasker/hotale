import adminModel from '../model/adminSchema.js'
import usermodel from "../model/userSchema.js"
import ownermodel from "../model/ownerSchema.js";
import hotelmodel from '../model/hotelSchema.js'
import coupenmodel from '../model/coupenSchema.js';
import bookingmodel from '../model/bookingSchema.js'
import { generateAdminToken } from '../middlewares/jwt.js'


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