

export const catchError =(cb)=>{
    return (req,res,next)=>{
        cb(req,res,next).catch((err)=>{
            next(err)
        })
    }
}