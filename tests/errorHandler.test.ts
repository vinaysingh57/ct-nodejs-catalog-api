import { errorHandler } from '../src/middleware/errorHandler';

describe('errorHandler', () => {
    it('returns the original error message in development mode', () => {
        process.env.NODE_ENV = 'development';

        const req = { originalUrl: '/api/products' } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next = jest.fn();

        errorHandler(new Error('upstream fetch failed'), req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            message: 'upstream fetch failed'
        }));
    });
});
