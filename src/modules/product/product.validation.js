import Joi from "joi"


const addProductValidation = Joi.object({
    title:Joi.string().min(5).max(1000).required(),
    description:Joi.string().min(5).max(5000).required(),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string(),
        originalname:Joi.string(),
        encoding:Joi.string(),
        mimetype:Joi.string().valid(),
        size:Joi.number().max(5242880),
        destination:Joi.string(),
        filename:Joi.string(),
        path:Joi.string(),
    })).required(),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string(),
        originalname:Joi.string(),
        encoding:Joi.string(),
        mimetype:Joi.string().valid(),
        size:Joi.number().max(5242880),
        destination:Joi.string(),
        filename:Joi.string(),
        path:Joi.string(),
    })).required(),
    price:Joi.number().required(),
    priceAfterDiscount:Joi.number().required(),
    sold:Joi.number().required(),
    stock:Joi.number().required(),
    category:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    rateAverage:Joi.number().min(0).max(5).required(),
    rateCount:Joi.number().required(),
    // createdBy:Joi.string().hex().length(24).required()

})


const updateProductValidation = Joi.object({
    title:Joi.string().min(5).max(1000).required(),
    description:Joi.string().min(5).max(5000),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string(),
        originalname:Joi.string(),
        encoding:Joi.string(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg'),
        size:Joi.number().max(5242880),
        destination:Joi.string(),
        filename:Joi.string(),
        path:Joi.string(),
    })),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string(),
        originalname:Joi.string(),
        encoding:Joi.string(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg'),
        size:Joi.number().max(5242880),
        destination:Joi.string(),
        filename:Joi.string(),
        path:Joi.string(),
    })),
    price:Joi.number(),
    priceAfterDiscount:Joi.number(),
    sold:Joi.number(),
    stock:Joi.number(),
    category:Joi.string().hex().length(24),
    brand:Joi.string().hex().length(24),
    subCategory:Joi.string().hex().length(24),
    rateAverage:Joi.number().min(0).max(5),
    createdBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24).required()
})




export{
    addProductValidation,
    updateProductValidation
}