import Joi from "joi"


const addCartValidation =Joi.object({
  cartItems:Joi.array().items(Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().required(),
    price:Joi.number().required()
  })),
  totalCartPrice:Joi.number().required(),
  discount:Joi.number(),
  totalPriceAfterDiscount:Joi.number()
})


// const UpdateCartValidation =Joi.object({
//     cartItems:Joi.array().items(Joi.object({
//       product:Joi.string().hex().length(24),
//       quantity:Joi.number(),
//       price:Joi.number()
//     })),
//     totalCartPrice:Joi.number(),
//     discount:Joi.number(),
//     totalPriceAfterDiscount:Joi.number(),
//   })



export{
    addCartValidation
}