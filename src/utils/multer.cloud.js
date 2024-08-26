import multer from "multer";
import { AppError } from "../utils/AppError.js";



export const fileValidation = {
    image:['image/png' , 'image/jpeg'],
    file:['application/pdf'],
    video:['video/mp4']
}


export const cloudUpload = ({allowType=fileValidation.image}={})=>{

    const storage = multer.diskStorage({})
 
    const fileFilter = (req,file,cb)=>{
        if(allowType.includes(file.mimetype)){
         cb(null,true)
        }else{
         cb(new AppError("Image Only" , 409) , false)
        }
    }
 
    const upload = multer({storage , fileFilter , limits:{
     fileSize:5 * 1024 * 1024
    }})
    return upload
 }
 
 export const uploadSingleFile =(fieldName,folderName)=>{
    return cloudUpload(folderName).single(fieldName)
 }
 
 export const uploadMixOfFiles =(arrayOfFields,folderName)=>{
     return cloudUpload(folderName).fields(arrayOfFields)
  }