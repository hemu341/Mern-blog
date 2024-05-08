import User from "../models/user-model.js";
import bcryptjs from "bcryptjs"


export const auth = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedpassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
       username,
       email,
       password:hashedpassword,
    })
    try {
        await newUser.save();
        res.json('signup successfull')
    } catch (err) {
        next(err)
    }
}