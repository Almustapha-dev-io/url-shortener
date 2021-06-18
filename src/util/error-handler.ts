import { NextFunction } from 'express';
import CustomError from '../types/custom-error';

const errorHandler = (next: NextFunction, err: Error) => {
    if (err instanceof CustomError) {
        next(err);
    } else {
        next(new CustomError(err.message));
    }   
};

export default errorHandler;