import { body, query, validationResult, type ValidationChain } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';
import type { ProductCreateInput } from '../types';

type ValidationMiddleware = ValidationChain | ((req: Request, res: Response, next: NextFunction) => void);

const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
        return;
    }

    next();
};

export const validateProductCreate: ValidationMiddleware[] = [
    body('name').isObject().withMessage('name must be an object'),
    body('slug').isObject().withMessage('slug must be an object'),
    body('productType').optional().isObject().withMessage('productType must be an object'),
    body('productTypeKey').optional().isString().notEmpty().withMessage('productTypeKey is required when provided'),
    body('masterVariant').optional().isObject(),
    validate
];

export const validateProductUpdate: ValidationMiddleware[] = [
    body('version').isNumeric().withMessage('version is required'),
    body('name').optional().isObject(),
    body('slug').optional().isObject(),
    body('productTypeKey').optional().isString().notEmpty(),
    body('masterVariant').optional().isObject(),
    validate
];

export const validateProductSearch: ValidationMiddleware[] = [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate
];
