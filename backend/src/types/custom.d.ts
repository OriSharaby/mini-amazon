import { Request } from "express";
import { Document } from "mongoose";
import { Interface } from "readline";

export interface IUser extends Document{
    id : string,
    name : string,
    email : string,
    isAdmin : boolean
}

interface AuthenticatedRequest extends Request {
    user? : IUser;
}