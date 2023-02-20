import usermodel from "../model/userSchema.js"
import tokenmodel from '../model/tokenSchema.js'
import { sendMail } from '../utils/sendEmail.js'
import { generateAuthToken,verifyToken } from '../middlewares/jwt.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export async function signUp (req,res,next){
    try {
        let obj = req.body
        let regName =/^[a-zA-Z]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let mob=/^([+]\d{2})?\d{10}$/
        if (obj.username && obj.email && obj.phone && obj.password ) {
            if (regName.test(obj.username.toString())) {
                if (regEmail.test(obj.email.toString())) {
                    if (mob.test(obj.phone.toString())) {
                        
                        let user= await usermodel.findOne({email:obj.email})
                        if (!user) {
                            obj.password= await bcrypt.hash(obj.password, 10)
                            await usermodel.create({
                                username:obj.username,
                                email:obj.email,
                                phone:obj.phone,
                                password:obj.password,
                            })
                            let userdetails=await usermodel.findOne({email:obj.email})
                            const token=await tokenmodel.create({
                                userId:userdetails._id,
                                token:crypto.randomBytes(32).toString('hex')
                            })
                            const url=`${process.env.BASE_URL}users/${userdetails._id}/verify/${token.token}`
                            await sendMail(userdetails.email,"Verify Email",url)
                            res.json({ "status": "success", "message": "signup success" })
                            
                        }else{
                            res.json({ "status": "failed", "message": "Email already registered" })
                        }

                    } else {
                        res.json({ "status": "failed", "message": "Enter valid Phone number" })
                    }
                } else {
                    res.json({ "status": "failed", "message": "Enter valid Email" })
                }
            } else {
                res.json({ "status": "failed", "message": "Enter valid username" })
            }
        } else {
            res.json({ "status": "failed", "message": "All fields are required" })
        }
    } catch (error) {
        console.log(error);
        res.json({ "status": "failed", "message": error.message })
    }
}


export async function login(req,res,next){
    try {
        let obj = req.body
        let user=await usermodel.findOne({email:obj.email})
        if (user) {
            const isMatch = await bcrypt.compare(obj.password,user.password)
            if (isMatch===true) {

                if (!user.isBanned) {
                    if(!user.isVerify){
                        const token=await tokenmodel.create({
                            userId:user._id,
                            token:crypto.randomBytes(32).toString('hex')
                        })
                        const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
                        await sendMail(user.email,"Verify Email",url)
                        res.json({ "status": "failed", "message": "An Email sent to your account please verify" })
                    }else{
                        const token=await generateAuthToken(user)
                        res.json({ "status": "success", "message": "You are successfully logged in", "token":token ,"name":user.username })
                    }
                } else {
                    res.json({ "status": "failed", "message": "Your account is blocked!!" })
                }


            } else {
                res.json({ "status": "failed", "message": "Password does not match" })
            }
        } else {
            res.json({ "status": "failed", "message": "Email not registered" })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function verifyEmail(req,res,next){
    try {
        const user=await usermodel.findOne({_id:req.params.id})
        if(!user)return res.status(400).send({message:"Invalid link"})

        const token=await tokenmodel.findOne({
            userId:user._id,
            token:req.params.token
        })
        if(!token)return res.status(400).send({message:"invalid link"})
        await usermodel.updateOne({_id:user._id,isVerify:true})
        await token.remove()

        res.status(200).send({message:"Email verified successfully"}) 
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
}


export async function getuser(req,res,next){
    try {
        const userId=req.userId
        const user=await usermodel.findById(userId)
        res.json({user:user})
    } catch (error) {
        console.log(error)
    }
}