import Joi from "joi";

const addCartValidation = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().required(),
});

const UpdateCartValidation = Joi.object({
  quantity: Joi.number(),

  id: Joi.string().hex().length(24).required(),
});

export { addCartValidation, UpdateCartValidation };
