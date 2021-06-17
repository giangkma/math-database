import { Document } from 'mongoose';
import { roles } from '../config';

export interface ILogin {
    username: string;
    password: string;
}
export interface IRegister extends ILogin {
    name: string;
}
export interface IUser extends Document {
    id: string;
    name: string;
    username: string;
    password?: string;
    role: roles;
    score?: string[];
}