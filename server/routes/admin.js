import  express  from "express";
import { addCoupen, admInBannHotel, adminChart, adminLogin, dashBoard, deleteNotification, getadminDash, getAdminDetails, getAllbookings, getHotel, getNotification, getOwner, getOwners, getThatHotel, getUsers, hotelStatus, ownerBlk, userBlk } from "../controller/adminController.js";
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
router.get('/getOwner/:ownerId',getOwner)
router.get('/getMydetails/:adminId',getAdminDetails)
router.get('/getAllbookings',adminJwt,getAllbookings)
router.get('/getDash',adminJwt,getadminDash)
router.get('/adminChart',adminJwt,adminChart)
router.get('/allNotification',adminJwt,getNotification)
router.get('/deleteNotification/:notifiId',adminJwt,deleteNotification)

export default router