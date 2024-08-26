import multer from "multer";
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import { AppError } from "../utils/AppError.js";



export const fileUpload = (folderName)=>{

   const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let fullPath = path.resolve(`uploads/${folderName}`)
        if(!fs.existsSync(fullPath)){
            fs.mkdirSync(fullPath,{recursive:true})
        }
        cb(null,`uploads/${folderName}`)
    },filename:(req,file,cb)=>{
        cb(null , uuidv4()+ '-' + file.originalname )
    }
   })

   const fileFilter = (req,file,cb)=>{
       if(file.mimetype.startsWith('image')){
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
   return fileUpload(folderName).single(fieldName)
}

export const uploadMixOfFiles =(arrayOfFields,folderName)=>{
    return fileUpload(folderName).fields(arrayOfFields)
 }