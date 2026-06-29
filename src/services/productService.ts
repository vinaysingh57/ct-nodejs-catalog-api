import { ProductRepository } from '../repositories/productRepository';
import type { ProductCreateInput, ProductSearchQuery, ProductUpdateInput } from '../types';

export class ProductService {
    constructor(private readonly repository = new ProductRepository()) { }

    public async createProduct(input: ProductCreateInput) {
        return this.repository.createProduct(input);
    }

    public async getProductById(productId: string) {
        return this.repository.getProductById(productId);
    }

    public async updateProduct(productId: string, input: ProductUpdateInput) {
        return this.repository.updateProduct(productId, input);
    }

    public async deleteProduct(productId: string, version: number) {
        return this.repository.deleteProduct(productId, version);
    }

    public async searchProducts(query: ProductSearchQuery) {
        return this.repository.searchProducts(query);
    }
}
