const Joi = require("@hapi/joi");


const registerValidation = (user) => {

    const schema = Joi.object({
        name: Joi.string().
            min(5).
            required(),
        email: Joi.string().
            min(12).
            required().
            email(),
        password: Joi.string().
            min(6).
            required()
    });
    return schema.validate(user);
};


module.exports.registerValidation = registerValidation;

