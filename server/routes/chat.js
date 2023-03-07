import  express  from "express";
import { createChat, findChat, ownerChats } from "../controller/chatContoller.js";
const router=express.Router();

router.post('/',createChat)
router.get('/:ownerId',ownerChats)
router.get('/find/:firstId/:secondId',findChat)

export default router