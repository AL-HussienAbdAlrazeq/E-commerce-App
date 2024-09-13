import Joi from "joi";

const CreateOrderValidation = Joi.object({
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().required(),
  }),
  id:Joi.string().hex().length(24).required()
});

export { CreateOrderValidation };
