

export const globalError = (err,req,res,next)=>{
    const code =err.statusCode || 500
    res.status(code).json({error: "Error", message:err.message , code})
}