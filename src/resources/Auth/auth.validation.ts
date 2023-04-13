import joi from "joi";

const Register = joi.object({
    name: joi.string().max(30).required(),

    email: joi.string().email().required(),

    password: joi.string().min(6).required(),
})


const Login = joi.object({
    email: joi.string().email().required(),

    password: joi.string().required(),
})

export default { Register, Login }