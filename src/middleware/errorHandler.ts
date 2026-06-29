import type { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { env } from '../config/env';

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        logger.warn(`${err.statusCode} ${err.message}`);
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
        return;
    }

    const message = err instanceof Error ? err.message : 'Unexpected server error';
    const isDevelopment = env.NODE_ENV !== 'production';
    logger.error(message, { stack: err instanceof Error ? err.stack : undefined, path: req.originalUrl });

    res.status(500).json({
        success: false,
        message: isDevelopment ? message : 'Internal server error'
    });
    next();
};
