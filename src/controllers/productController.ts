import type { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { successResponse } from '../utils/response';
import { AppError } from '../middleware/errorHandler';

export class ProductController {
    constructor(private readonly productService = new ProductService()) { }

    public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const payload = await this.productService.createProduct(req.body);
            res.status(201).json(successResponse(payload, 'Product created'));
        } catch (error) {
            next(error);
        }
    };

    public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
            const payload = await this.productService.getProductById(productId);
            res.status(200).json(successResponse(payload, 'Product retrieved'));
        } catch (error) {
            next(error);
        }
    };

    public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
            const version = Number(req.body.version ?? req.query.version);
            if (!version) {
                throw new AppError('version is required for updates', 400);
            }

            const payload = await this.productService.updateProduct(productId, { ...req.body, version });
            res.status(200).json(successResponse(payload, 'Product updated'));
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
            const version = Number(req.query.version ?? req.body.version);
            if (!version) {
                throw new AppError('version is required for deletes', 400);
            }

            await this.productService.deleteProduct(productId, version);
            res.status(200).json(successResponse(null, 'Product deleted'));
        } catch (error) {
            next(error);
        }
    };

    public searchProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 20);
            const productPage = await this.productService.searchProducts({
                q: typeof req.query.q === 'string' ? req.query.q : undefined,
                category: typeof req.query.category === 'string' ? req.query.category : undefined,
                page,
                limit
            });

            res.status(200).json(successResponse(productPage.results, 'Products retrieved', {
                page: productPage.page,
                limit: productPage.limit,
                total: productPage.total,
                totalPages: Math.ceil(productPage.total / productPage.limit)
            }));
        } catch (error) {
            next(error);
        }
    };
}
