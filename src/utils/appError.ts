export class AppError extends Error {
    statusCode: number;
    details?: any;

    constructor(message: string, statusCode = 400, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }

    
}

// Specific error classes 
export class BadRequestError extends AppError {
    constructor(message = "Bad Request Error", details?: any) {
        super(message, 400, details);
    }
}

// Not Found Error class
export class NotFoundError extends AppError {
    constructor(message = "Not Found Error", details?: any) {
        super(message, 404, details);
    }
}

// Unauthorized Error class
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized Error", details?: any) {
        super(message, 401, details);
    }
}

// FOrbidden Error class
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden Error", details?: any) {
        super(message, 403, details);
    }
}   

// Internal Server Error class
export class InternalServerError extends AppError {
    constructor(message = "Internal Server Error", details?: any) {
        super(message, 500, details);
    }
}

