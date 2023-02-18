import  express  from "express";
import { adminLogin, dashBoard, getHotel, getOwners, getUsers, hotelStatus, ownerBlk, userBlk } from "../controller/adminController.js";
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

export default router