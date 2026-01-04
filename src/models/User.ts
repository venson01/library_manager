import mongoose, { Mongoose, Schema } from "mongoose";

// Define the User interface
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: string;
    address: string;
    phone: string;
}
// Define roles enum
export enum RoleEnum {
    MEMBER = 'member',
    LIBRARIAN = 'librarian',
    ADMIN = 'admin'
}
// Define the User schema
const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true, minLength: 3 },
        role: {type: String, enum: RoleEnum, default: RoleEnum.MEMBER},
        address: { type: String },
        phone: { type: String }
    },
    { timestamps: true }
)

// Create and export the User model
export const User = mongoose.model<IUser>("User", UserSchema);