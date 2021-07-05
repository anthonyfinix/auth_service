import joi from 'joi';

export const joi_username = joi.string();
export const joi_password = joi.string();
export const joi_login_optional = joi.object({
    username: joi_username.optional(),
    password: joi_password.optional(),
})
const joi_login = joi.object({
    username: joi_username.required(),
    password: joi_password.required(),
})
export default joi_login;