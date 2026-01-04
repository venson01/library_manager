import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {AuthPayload} from "../types/auth";
import { Request, Response, NextFunction } from "express";

// Load environment variables 
dotenv.config();

// Middleware to require authentication
export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Extract token from Authorization header
    const token = req.get("authorization")?.split(" ")[1];

    // If no token is provided, return 401 unauthorized
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Not authenticated"
        });
    }

    // Verifying the token
    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY as string
        ) as AuthPayload;

        req.user = decoded as any; // cast to bypass RoleEnum vs string mismatch
        next();
    } catch {
        return res.status(401).json({
            status: false,
            message: "Not authenticated"
        });
    }
};

 // Middleware to require librarian role
export const requiredLibrarian = (req: Request, res: Response, next: NextFunction) => {
    console.log("User role: ", req.user);
    console.log("User role: ", req.user?.role);

    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({
            status: false,
            message: "Not authenticated"
        });
    }

    // Check if user has librarian or admin role
    if (req.user?.role !== 'librarian' && req.user?.role !== 'admin') {
        return res.status(403).json({status: false, message: "Access denied. librarian role required."});

    }
    next();
}

