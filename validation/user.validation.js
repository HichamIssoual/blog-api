const Joi = require("joi")

const registerValidation = (obj) => {
    const schemaValidation = Joi.object({
        username: Joi.string().required().trim().min(4).max(15),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().trim().min(6).max(200)
    })
    return schemaValidation.validate(obj);
}
const updateUserValidation = (obj) => {
    const schemaValidation = Joi.object({
        username: Joi.string().trim().min(4).max(15),
        password: Joi.string().trim().min(6).max(200),
        bio: Joi.string().trim().min(1).max(600)
    })
    return schemaValidation.validate(obj);
}
module.exports = {
    registerValidation,
    updateUserValidation,
}