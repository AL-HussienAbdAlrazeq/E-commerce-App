import Joi from "joi"




const addUserValidation =  Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email:Joi.string().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password'),
  })

  const updateUserValidation =  Joi.object({
    email:Joi.string(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password'),
    role:Joi.string(),
    id:Joi.string().hex().required()
  })


  export{
    addUserValidation,
    updateUserValidation
  }