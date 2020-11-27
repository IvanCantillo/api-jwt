const Joi = require('@hapi/joi');
const validations = {}

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

validations.login = (data) => {
    const { error } = schemaLogin.validate(data);
    return error
}

validations.register = (data) => {
    const { error } = schemaRegister.validate(data);
    return error
}

module.exports = validations;