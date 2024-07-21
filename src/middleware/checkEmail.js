import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"



export const checkEmail = async(req,res,next)=>{
   const isFound =await User.findOne({email:req.body.email})
   if(isFound){  return next(new AppError("Email ALReady Exist" , 409))}
   next() 
}