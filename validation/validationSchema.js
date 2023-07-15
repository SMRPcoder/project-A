const joi = require("joi");

const LoginSchema=joi.object({
        email:joi.string().email().min(4).required(),
        password:joi.string().min(8).required()
});

const AddUserSchema=joi.object({
        email:joi.string().email().min(4).required(),
        firstname:joi.string().min(2).required(),
        lastname:joi.string().min(1),
        password:joi.string().min(8).required(),
        roleId:joi.string().required()
});
const DevUserSchema=joi.object({
        email:joi.string().email().min(4).required(),
        firstname:joi.string().min(2).required(),
        lastname:joi.string().min(1),
        password:joi.string().min(8).required()
});

const EditUserSchema=joi.object({
        email:joi.string().email().min(4),
        firstname:joi.string().min(2),
        lastname:joi.string().min(1),
        password:joi.string().min(8),
        roleId:joi.string()
});



module.exports={LoginSchema,AddUserSchema,EditUserSchema,DevUserSchema};