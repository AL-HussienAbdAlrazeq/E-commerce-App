import Joi from "joi"


const addAddressValidation =Joi.object({
    city:Joi.string().required(),
    phone:Joi.string().required(),
    street:Joi.string().required()
})



export{
    addAddressValidation
}