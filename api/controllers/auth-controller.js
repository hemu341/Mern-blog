import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorhandler(400,'all fields are required'))
    }
    const hashedpassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
       username,
       email,
       password:hashedpassword,
    })
    try {
        await newUser.save();
        res.json('sign up successfull')
    } catch (err) {
        next(err)
    }
}


export const signin = async(req,res,next)=>{
   const {email,password} = req.body

   if(!email || !password || email === '' || password === ''){
    next(errorhandler(400,'all fields are required'))
}

   try {
    const validUser = await User.findOne({ email })
    if(!validUser){
        return next(errorhandler(404,'user not found'))
    }
    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword){
       return next(errorhandler(400,'invalid password'))
    }
    const {password: pass, ...rest} = validUser._doc
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    res.status(200).cookie('access_token',token,{
        httpOnly: true,
    }).json(rest)
   } catch (error) {
    next(error)
   }
}