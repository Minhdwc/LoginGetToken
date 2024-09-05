const Joi = require('joi');
const UserServices = require('../services/UserServices');

const createUser = async (req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().required(),
            comfirmPassword: Joi.string(),
            dateOfBirth: Joi.date().required(),
            email: Joi.string(),
            role: Joi.string(),
        })
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                status: error.status,
                message: error.details[0].message
            });
        }
        const respon = await UserServices.CreateUserServices(req.body);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}

const getAllUser = async (req, res)=>{
    try{
        const respon = await UserServices.getAllUserServices();
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const getDetailUser = async (req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({status: "error", message:"User not found"});
        }
        const respon = await UserServices.getDetailServices(id);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const updateUser = async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            return res.status(404).json({status: "error", message:"User not found"});
        }
        const respon = await UserServices.updateUserServices(id, data);
        return res.status(200).json(respon);
    }
    catch(e){
        return res.status(404).json({message: e.message});
    }
}
const deleteUser = async(req, res)=>{
    try{
        const id  = req.params.id;
        if(!id){
            return res.status(404).json({status: "error", message:"User not found"});
        }
        const respon = await UserServices.deleteUserServices(id);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
module.exports={
    createUser,
    getAllUser,
    getDetailUser,
    updateUser,
    deleteUser
}