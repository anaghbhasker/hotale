import  express  from "express";
import { addCoupen, admInBannHotel, adminLogin, dashBoard, getHotel, getOwners, getThatHotel, getUsers, hotelStatus, ownerBlk, userBlk } from "../controller/adminController.js";
import { adminJwt } from "../middlewares/jwt.js";
const router=express.Router();

router.post('/adminLogin',adminLogin)
router.get('/dashBoard',adminJwt,dashBoard)
router.get('/getUsers',adminJwt,getUsers)
router.get('/getOwners',adminJwt,getOwners)
router.get('/userBlk/:id',adminJwt,userBlk)
router.get('/ownerBlk/:id',adminJwt,ownerBlk)
router.get('/getHotels',adminJwt,getHotel)
router.get('/hotelApprove/:id',adminJwt,hotelStatus)
router.get('/getThatHotel/:id',adminJwt,getThatHotel)
router.get('/hotelBann/:id',adminJwt,admInBannHotel)
router.post('/addCoupen',adminJwt,addCoupen)

export default router