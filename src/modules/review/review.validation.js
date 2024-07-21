import Joi from "joi"


const addReviewValidation = Joi.object({
    comment:Joi.string().min(1).max(1000).required(),
    user:Joi.string().hex().length(24),
    product:Joi.string().hex().length(24).required(),
    rate:Joi.number().min(0).max(5).required()
})


const updateReviewValidation = Joi.object({
    comment:Joi.string().min(1).max(1000),
    user:Joi.string().hex().length(24),
    product:Joi.string().hex().length(24),
    rate:Joi.number().min(0).max(5),
    id:Joi.string().hex().length(24).required()
})




export{
    addReviewValidation,
    updateReviewValidation
}