import User from "../models/user.js";
import mongoose from "mongoose";

export const getUser = async(req, res) => {
    try{
        const Users = await User.find();
        res.status(200).json(Users);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

export const createUser = async(req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).json(user);
    }catch(error) {
        res.status(400).json({message: error.message});
    }
};

export const SearchUser = async(req, res)=>{
    try{
        const Users = await User.findOne({_id: req.IDtosearch._id});
        res.status(200).json(Users);
    }catch(error){
        res.status(400).json({message: error.message});
    }  
    
}

export const updatePassword = async(req,res)=>{
    console.log("reqbodyyy:", req.body);
    try{
        // const Newdata = await User.updateOne({ID: id}, {$set:{password: newpassword}})
        // res.status(200).json(Newdata);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

