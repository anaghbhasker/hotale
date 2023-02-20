import  express  from "express";
const router=express.Router();
import { signUp ,verifyEmail,login, getuser } from "../controller/userController.js";
import { userJwt } from "../middlewares/jwt.js";



router.post('/user_signUp',signUp)
router.post('/user_Login',login)
router.get('/:id/verify/:token',verifyEmail)
router.get('/getUser',userJwt,getuser)







export default router 