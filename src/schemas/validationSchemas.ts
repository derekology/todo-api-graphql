const Joi = require('joi');

export const authSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca', 'co'] } }).required(),
    password: Joi.string().max(20).required(),
});

export const taskSchema = Joi.object({
    owner: Joi.string().length(16).required(),
    name: Joi.string().max(20).required(),
    description: Joi.string().max(100),
    category: Joi.string().valid('Cleaning', 'Shopping', 'Work').required(),
});