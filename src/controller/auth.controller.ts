import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth";


// Controller to handle user registration
export const register = async(req: Request, res: Response) => {
    const payload = req.body;

    // Logic to register a user using the payload
    const resp = await registerUser(payload);
    return res.success("User registered successfully", resp, 201);
}

// Controller to handle user login
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser({ email, password });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user,
                token: result.token
            }
        });
    } catch (error) {
        next(error); // forwards AppError / BadRequestError to global error handler
    }
};
