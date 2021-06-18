import { Request, Response, NextFunction } from 'express';
import CustomError from '../types/custom-error';

export default function (error: Error, req: Request, res: Response, next: NextFunction) {
    let code = 500;
    
    if (error instanceof CustomError) {
        code = error.code;
    }

    return res.status(code).json({ message: error.message, data: null });
}