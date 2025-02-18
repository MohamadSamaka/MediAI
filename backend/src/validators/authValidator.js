const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const validateUserRgisteration = (userData) => {
  if (typeof userData.DateOfBirth === 'string') {
    // Convert the incoming string to a Date object BEFORE Joi sees it:
    userData.DateOfBirth = new Date(userData.DateOfBirth);
  }
  
  const schema = Joi.object({
    fName: Joi.string().min(3).max(30).required(),
    lName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    DateOfBirth: Joi.date().iso().required(),
    address: Joi.string().required(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) 
    throw new JsonedResponseError(error.details[0].message, 400); 
}

const validateUserLogin = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).strict();

  const { error } = schema.validate(userData);
  if (error) 
    throw new JsonedResponseError(error.details[0].message, 400); 
}

module.exports = {
  validateUserRgisteration,
  validateUserLogin
};
