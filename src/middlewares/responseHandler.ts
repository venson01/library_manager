import { NextFunction, Request, Response } from "express";

// Middleware to handle standardized responses
export const responseHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.success = function <T = any>(message: string, data?: T, statusCode: number = 200) {
        return this.status(statusCode).json({
            success: true,
            message,
            data: data ?? null,
        });
    };

    res.error = function (message: string, statusCode = 400, details?: any) {
        return this.status(statusCode).json({
            success: false,
            message,
            details: details ?? null,
        });
    };

    next();
}