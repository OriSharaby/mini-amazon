import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document{
    id : string,
    name : string,
    email : string,
    isAdmin : boolean
}

export interface AuthenticatedRequest extends Request {
    user? : IUser;
}