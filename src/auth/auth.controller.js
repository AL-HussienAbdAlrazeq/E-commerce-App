
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"
import { catchError } from "../middleware/catchError.js"



const signup= catchError(async (req,res)=>{

  const user = new User(req.body)
  await user.save()
  let token = jwt.sign({userId:user._id , role:user.role} , process.env.SECRET_KEY )
  res.status(201).json({message:"success" , token}) 
})



const signin= catchError(async (req,res,next)=>{

  const user = await User.findOne({email:req.body.email})

  if(!user || !bcrypt.compareSync(req.body.password , user.password) )
      return next(new AppError("incorrect email or password ",404))
    
  jwt.sign({ userId:user.id ,  name:user.name ,  role:user.role} , process.env.SECRET_KEY,(err , token)=>{
                      res.status(201).json({message:"login" , token})
            })
 })



 const changeUserPassword =  catchError(async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user || !bcrypt.compareSync(req.body.oldPassword , user.password) )
      return next(new AppError("incorrect email or password ",404))

    await User.findOneAndUpdate({email:req.body.email} , {password:req.body.newPassword})
    const token = jwt.sign({ userId:user.id , role:user.role} ,"S7S" )
    res.status(201).json({message:"login" , token})


  //   if(user && bcrypt.compareSync(req.body.oldPassword , user.password) ){
  //         await User.findOneAndUpdate({email:req.body.email} , {password:req.body.newPassword})
  //         const token = jwt.sign({ userId:user.id , role:user.role} ,"S7S" )
  //         res.status(201).json({message:"login" , token})
  //   }
  //  next(new AppError("incorrect email or password ",404))

 })



 const protectedRoutes =  catchError(async (req,res,next)=>{

      let {token} = req.headers
      let userPayload = null
      if(!token) return next(new AppError("Token Not Provided" , 401))
      jwt.verify(token , process.env.SECRET_KEY ,(err,payload)=>{
        if(err) return next(new AppError(err , 401))
        userPayload = payload
      })
      let user = await User.findById(userPayload.userId)
      if(!user) return next(new AppError("User Not Found" , 401))
      if(user.passwordChangedAt){
        let time = parseInt(user.passwordChangedAt.getTime()/1000)
        if(time > userPayload.iat) return next(new AppError("Invalid Token...Login Again" , 401))
      }
      req.user = user
      next()
})



const allowedTo=(...roles)=>{
  
  return catchError(async (req,res,next)=>{
    if(roles.includes(req.user.role)){
      return next()
    }
    return next(new AppError("You Not Authorized To Access this Endpoint",401))
 })
}

 


export{
    signup,
    signin,
    changeUserPassword,
    protectedRoutes,
    allowedTo
}