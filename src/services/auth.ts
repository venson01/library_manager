import { IsJWT } from "class-validator";
import { IUser, User } from "../models/User";
import { AppError, BadRequestError } from "../utils/appError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Service to register a new user
export const registerUser = async (payload: IUser) => {
    const {email, password, name, role, address, phone} = payload;

    
// Check if user already exists
    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    // Hash the password and create the user
    const hashed = await bcrypt.hash(payload.password, 10);
    const user = await User.create({...payload, password: hashed});

    return user;
}

// Service to login a user 
export const loginUser = async (payload: {email: string, password: string}) => {
    const user = await User.findOne({ email: payload.email});

    // Validate user existence
    if (!user) {
        throw new AppError('Invalid user', 400);
    }

    // Validate password
    const match = await bcrypt.compare(payload.password, user.password);

    // To check if the password is a match
    if (!match) {
        throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT token
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    // Sign the token with a secret key and set expiration
    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY!, {expiresIn: '1d'}); 


    // Return user and token
    return { user, token };
}