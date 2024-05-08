import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user-route.js'
import authRoutes from './routes/auth-route.js'

const port = 8000;

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected")
}).catch((err)=>{
    console.log(err);
})
app.listen(port,()=>{
    console.log("server is up and running on 8000..")
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
    const statuscode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    res.json({
        success: false,
        statuscode,
        message,
    })
})