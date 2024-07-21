
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"



const addUser = catchError(async(req,res,next)=>{
    
    const user = new User(req.body)
    await user.save()
    res.status(201).json({message:"Success",user})
})



const getAllUsers = catchError(async(req,res,next)=>{

    const apiFeatures = new ApiFeatures(User.find() , req.query).pagination().fields().filter().sort().search()
    const users = await apiFeatures.mongooseQuery

    if(users.length===0) return next(new AppError("Users Not Founded" , 404))
    res.status(200).json({message:"Success",page:apiFeatures.pageNumber,users})
})



const getUser = catchError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    user || next(new AppError("User Not Found" , 404))
   !user || res.status(200).json({message:"Success",user})
})



const updateUser = catchError(async(req,res,next)=>{

    const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})
     user || next(new AppError("User Not Found" , 404))
    !user || res.status(200).json({message:"Success",user})
})
 


const deleteUser = deleteOne(User)


export{
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}