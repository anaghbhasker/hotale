import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
// import helmet from 'helmet'


import connectDb from './config/dbconnection.js'



import userRouter from './routes/user.js'
import ownerRouter from './routes/owner.js'
import adminRouter from './routes/admin.js'
import chatRouter from './routes/chat.js'
import messageRoute from './routes/message.js'


//////  VARIABLES

const app= express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL




app.use(bodyParser.json({ limit:"200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"200mb", extended : true , parameterLimit: 50000000}))

////// Database

connectDb(DATABASE_URL)


//////  CONFIGURATION

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true,
}));


// app.use(helmet({ crossOriginResourcePolicy : true}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json({extended: false, limit: '50mb'}));
app.use(express.static("public"))
app.use(cookieParser())





//////Routes

app.use('/message',messageRoute)
app.use('/chat',chatRouter)
app.use('/admin',adminRouter)
app.use('/owner',ownerRouter)
app.use('/',userRouter)




app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})


/////error handler
app.use((err,req,res,next)=>{
    return res.status(500).json("Hello error from handler")
})