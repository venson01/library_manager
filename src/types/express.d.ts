import 'express'
import { RoleEnum } from '../models/User';

// Extending Express Response interface
declare module 'express-serve-static-core' {
    interface Response {
        success(message: string, data?: any, statusCode?: number): this;
        error(message: string, statusCode?: number, details?: any): this;
    }
}

export {};

// Extending Express Request interface
declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            role: RoleEnum
        }

        interface Request {
            user?: User;
        }
        
    }
}

export {};