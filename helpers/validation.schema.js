const Joi = require('@hapi/joi');

const RegisterValidationSchema = Joi.object({
  name: Joi.string().trim().required().min(3).pattern(new RegExp('^[a-zA-Z\\s]+$'), { name: 'alphabets' }).messages({
    'any.required': 'Name is required.',
    'string.base': `Name should be a type of text.`,
    'string.empty': `Name cannot be an empty field.`,
    'string.min': `Name should have a minimum length of {#limit} characters.`,
    'string.pattern.base': `Name should only contain alphabetic characters.`,
    'string.pattern.name': `Name should only contain alphabetic characters.`,
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': `Email is a required field.`,
      'string.email': `Please enter a valid email address.`,
    }),
  pass: Joi.string()
    .trim()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
    .messages({
      'any.required': `Password is required.`,
      'string.empty': `Password cannot be an empty field.`,
      'string.min': `Password should be at least {#limit} characters long.`,
      'string.pattern.base': `Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.`,
    }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  pass: Joi.string().min(8).trim().required(),
}).options({ abortEarly: false });

module.exports = {
  RegisterValidationSchema,
  loginValidationSchema,
};
