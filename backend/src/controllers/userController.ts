import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { AuthenticatedRequest, IUser } from "../types/custom";

export const registerUser = async (req : Request, res : Response) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    try{
        if(userExists){
        return res.status(400).json({message: 'user already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        });
    }
    catch(error){
        return res.status(500).json({message: 'server error', error});
    }

}

export const loginUser = async (req : Request, res : Response) =>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({messege: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({messege: "Invalid credentials"})
        }

        const token = generateToken(user._id.toString());

        return res.json({
            _id : user._id,
            name : user.name,
            email : email,
            isAdmin : user.isAdmin,
            token,
        });
    }   
    catch(error){
        return res.status(500).json({messege : "Server error", error});
    }
};

export const getUserProfile = async (req : AuthenticatedRequest, res : Response, ) => {
    const user = req.user;
    
    if(user){
        res.json(user);
    }else{
        res.status(404).json({messege : "User not found"});
    }

}