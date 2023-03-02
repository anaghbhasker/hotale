import  express  from "express";
const router=express.Router();
import { signUp ,verifyEmail,login, getuser, getHotel, hotelView, coupenApply, bookingFlow, getAllbookings, bookingCancel } from "../controller/userController.js";
import { userJwt } from "../middlewares/jwt.js";



router.post('/user_signUp',signUp)
router.post('/user_Login',login)
router.get('/:id/verify/:token',verifyEmail)
router.get('/getUser',userJwt,getuser)
router.get('/getAllhotel',getHotel)
router.get('/hotelView',hotelView)
router.post('/coupenApply',userJwt,coupenApply)
router.post('/bookingFlow',userJwt,bookingFlow)
router.get('/getBookings',userJwt,getAllbookings)
router.get('/bookingCancel/:id',userJwt,bookingCancel)






export default router 