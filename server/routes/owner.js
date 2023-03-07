import  express  from "express";
const router=express.Router();

import { addHotel, addLocation, deleteHotel, editHotel, editProfile, fullDetails, getAdmin, getAdmins, getBookings, getEditHotel, getOwner, getOwnerHotel, hotelBann, myPhoto, ownerLogin, ownerOtpVerify, ownerSignup } from "../controller/ownerController.js";
import { ownerJwt } from "../middlewares/jwt.js";



router.post('/owner_signup',ownerSignup)
router.post('/otpVerify',ownerOtpVerify)
router.post('/owner_login',ownerLogin)
router.get('/getOwner',ownerJwt,getOwner)
router.post('/addHotel',ownerJwt,addHotel)
router.post('/addLocation',ownerJwt,addLocation)
router.get('/getOwnerHotel',ownerJwt,getOwnerHotel)
router.get('/getEdithotel/:id',ownerJwt,getEditHotel)
router.post('/editHotel',ownerJwt,editHotel)
router.get('/deleteHotel/:id',ownerJwt,deleteHotel)
router.get('/hotelBann/:id',ownerJwt,hotelBann)
router.get('/fullDetails',ownerJwt,fullDetails)
router.post('/editProfile',ownerJwt,editProfile)
router.get('/getBookings/:id',ownerJwt,getBookings)
router.get('/getAdminChat',getAdmins)
router.get('/getAdmin/:adminId',getAdmin)
router.get('/myPhoto/:ownerId',myPhoto)



export default router