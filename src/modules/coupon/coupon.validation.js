import Joi from "joi"


const addCouponValidation = Joi.object({
    code:Joi.string().required(),
    discount:Joi.number().min(0).required(),
    expires:Joi.date().required()
})


const updateCouponValidation = Joi.object({
    code:Joi.string(),
    discount:Joi.number(),
    expires:Joi.date(),
    id:Joi.string().hex().length(24).required()
})




export{
    addCouponValidation,
    updateCouponValidation
}