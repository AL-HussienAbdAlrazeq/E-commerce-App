import Joi from "joi"


const addSubCategoryValidation = Joi.object({
    name:Joi.string().min(1).max(100).required(),
    category:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).required()
})


const updateSubCategoryValidation = Joi.object({
    name:Joi.string().min(1).max(100),
    category:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24).required()
})




export{
    addSubCategoryValidation,
    updateSubCategoryValidation
}