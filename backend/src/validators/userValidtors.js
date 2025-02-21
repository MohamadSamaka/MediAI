const Joi = require("joi");
const JsonedResponseError = require("../errors/JsonedResponseError");

const validateUserCreation = (userData) => {
  if (typeof userData.DateOfBirth === 'string') {
    userData.DateOfBirth = new Date(userData.DateOfBirth);
  }
  const schema = Joi.object({
    fName: Joi.string().min(3).max(30).required(),
    lName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    DateOfBirth: Joi.date().iso().required(),
    address: Joi.string().required(),
    roleId: Joi.string().required(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

const validateUserUpdate = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    roleId: Joi.string().optional(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) throw new JsonedResponseError(error.details[0].message, 400);
};

module.exports = {
  validateUserCreation,
  validateUserUpdate,
};
