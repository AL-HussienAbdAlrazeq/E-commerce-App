import { AppError } from "../utils/AppError.js"


export const validate = (schema)=>{
   return(req,res,next)=>{
    // if(image==req.file || logo==req.file ||imageCover==req.file ||images==req.files){}
     const {error} = schema.validate({ ...req.body , ...req.params,...req.query},{abortEarly:false})
     if(!error){
        next()
     }else{
        let errMsg = error.details.map(err=>err.message)
        return next(new AppError(errMsg,401))
     }
   }
}