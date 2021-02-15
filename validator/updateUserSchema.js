const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userProfileUpdateSchema= Joi.object().keys({
    name: Joi.string().exist().required(),
    email: Joi.string().exist().email().required(),
    phone_number: Joi.string().exist().required(),
    id: Joi.objectId(),
    //photo: joi.string().exist().required(),
})

module.exports = userProfileUpdateSchema;