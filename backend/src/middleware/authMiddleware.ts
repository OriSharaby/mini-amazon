import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { AuthenticatedRequest } from "../types/custom";


export const protect = async (
    req : AuthenticatedRequest,
    res : Response,
    next : NextFunction, 
) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded : any = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = await User.findById(decoded.id).select("-password")

            next();
        }
        catch(error){
            return res.status(401).json({messege : "Not authorized, token failed"});
        }
    }
    else{
        return res.status(401).json({messege: "Not authorized, no token"});
    }
}