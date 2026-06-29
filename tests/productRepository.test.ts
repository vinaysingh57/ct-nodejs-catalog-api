import { ProductRepository } from '../src/repositories/productRepository';
import { apiRoot } from '../src/config/commercetools';

jest.mock('../src/config/commercetools', () => ({
    apiRoot: {
        products: jest.fn()
    }
}));

describe('ProductRepository', () => {
    it('fetches a product by id', async () => {
        const execute = jest.fn().mockResolvedValue({ body: { id: 'product-1' } });
        const get = jest.fn().mockReturnValue({ execute });
        const withId = jest.fn().mockReturnValue({ get });
        (apiRoot.products as jest.Mock).mockReturnValue({ withId });

        const repository = new ProductRepository();
        const result = await repository.getProductById('product-1');

        expect(withId).toHaveBeenCalledWith({ ID: 'product-1' });
        expect(get).toHaveBeenCalled();
        expect(result).toEqual({ id: 'product-1' });
    });

    it('uses the provided actions payload when updating a product', async () => {
        const execute = jest.fn().mockResolvedValue({ body: { id: 'product-1' } });
        const post = jest.fn().mockReturnValue({ execute });
        const withId = jest.fn().mockReturnValue({ post });
        (apiRoot.products as jest.Mock).mockReturnValue({ withId });

        const repository = new ProductRepository();
        const input = {
            version: 2,
            actions: [{ action: 'setDescription', description: { en: 'The best product ever!' } }]
        };

        await repository.updateProduct('product-1', input as any);

        expect(withId).toHaveBeenCalledWith({ ID: 'product-1' });
        expect(post).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.objectContaining({
                version: 2,
                actions: input.actions
            })
        }));
    });
});
