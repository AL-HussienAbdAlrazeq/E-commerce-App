import Joi from "joi"


const addToWishListValidation =Joi.object({
    product:Joi.string().hex().length(24).required()
})



export{
    addToWishListValidation
}