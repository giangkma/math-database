/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../domain/auth.domain';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        private: true,
    },
    role: {
        type: String,
        default: 'student',
    },
    score: {
        type: Array,
        default: [0, 0, 0, 0, 0],
    },
});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;
