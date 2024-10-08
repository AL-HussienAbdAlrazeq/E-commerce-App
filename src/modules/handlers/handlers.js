import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"


 const deleteOne = (model)=>{

    return catchError(async(req,res,next)=>{

        const document = await model.findByIdAndDelete(req.params.id)
        let imagePath = category.image.split(process.env.BASE_URL)[1]
        deleteFile(imagePath)
        document || next(new AppError("Document Not Found" , 404))
       !document || res.status(200).json({message:"Success",document})
       
    })
}


export{
    deleteOne
}