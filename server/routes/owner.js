import  express  from "express";
const router=express.Router();

import { addHotel, addLocation, editHotel, getEditHotel, getOwner, getOwnerHotel, ownerLogin, ownerOtpVerify, ownerSignup } from "../controller/ownerController.js";
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




export default router