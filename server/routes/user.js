import  express  from "express";
const router=express.Router();
import { signUp ,verifyEmail,login } from "../controller/userController.js";



router.post('/user_signUp',signUp)
router.post('/user_Login',login)
router.get('/:id/verify/:token',verifyEmail)







export default router 