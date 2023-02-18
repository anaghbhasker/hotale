import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'


import connectDb from './config/dbconnection.js'



import userRouter from './routes/user.js'
import ownerRouter from './routes/owner.js'
import adminRouter from './routes/admin.js'


//////  VARIABLES

const app= express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL



////// Database

connectDb(DATABASE_URL)



//////  CONFIGURATION

// app.use(helmet({ crossOriginResourcePolicy : true}));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit:"200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"200mb", extended : true , parameterLimit: 10000000}))

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true,
}));



//////Routes

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