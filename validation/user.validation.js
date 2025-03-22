const Joi = require("joi")

const registerValidation = (obj) => {
    const schemaValidation = Joi.object({
        username: Joi.string().required().trim().min(4).max(15),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().trim().min(6).max(200)
    })
    return schemaValidation.validate(obj);
}
const loginValidation = (obj) => {

}
module.exports = {
    registerValidation,
    loginValidation,
}