"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slug_1 = require("../src/utils/slug");
const response_1 = require("../src/utils/response");
describe('slugify', () => {
    it('creates a URL-friendly slug from a product name', () => {
        expect((0, slug_1.slugify)('Summer Running Shoes!')).toBe('summer-running-shoes');
    });
    it('removes leading and trailing separators', () => {
        expect((0, slug_1.slugify)('---demo---')).toBe('demo');
    });
});
describe('successResponse', () => {
    it('standardizes API responses', () => {
        expect((0, response_1.successResponse)({ id: '123' }, 'Created', { page: 1 })).toEqual({
            success: true,
            message: 'Created',
            data: { id: '123' },
            meta: { page: 1 }
        });
    });
});
