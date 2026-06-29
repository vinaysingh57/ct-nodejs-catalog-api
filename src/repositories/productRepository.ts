import { apiRoot } from '../config/commercetools';
import logger from '../config/logger';
import type { ProductCreateInput, ProductSearchQuery, ProductUpdateInput } from '../types';

export class ProductRepository {
    public async createProduct(input: ProductCreateInput) {
        const productTypeKey = input.productType?.key ?? input.productTypeKey;
        const productType = input.productType?.id
            ? { typeId: 'product-type' as const, id: input.productType.id }
            : { typeId: 'product-type' as const, key: productTypeKey };

        const categories = (input.categories ?? []).map((category) => ({
            typeId: category.typeId as 'category',
            id: category.id
        }));

        const draft = {
            productType,
            name: input.name,
            slug: input.slug,
            description: input.description,
            categories: categories.length > 0 ? categories : (input.categoryKeys ?? []).map((key) => ({ typeId: 'category' as const, key })),
            masterVariant: input.masterVariant ?? {},
            variants: input.variants,
            publish: input.publish ?? false
        };

        logger.info('Creating commercetools product', { productTypeKey, productType });
        const response = await apiRoot.products().post({ body: draft as any }).execute();
        return response.body;
    }

    public async getProductById(productId: string) {
        logger.info('Fetching commercetools product by id', { productId });
        const response = await apiRoot.products().withId({ ID: productId }).get().execute();
        return response.body;
    }

    public async updateProduct(productId: string, input: ProductUpdateInput) {
        logger.info('Updating commercetools product', { productId, version: input.version });

        const explicitActions = (input.actions ?? []).filter(Boolean);
        const legacyActions = [
            input.name !== undefined ? { action: 'setName', name: input.name } : null,
            input.slug !== undefined ? { action: 'setSlug', slug: input.slug } : null,
            input.description !== undefined ? { action: 'setDescription', description: input.description } : null
        ].filter(Boolean) as Array<Record<string, unknown>>;

        const actions = explicitActions.length > 0 ? explicitActions : legacyActions;
        const response = await apiRoot.products().withId({ ID: productId }).post({
            body: {
                version: input.version,
                actions: actions as any
            }
        }).execute();

        return response.body;
    }

    public async deleteProduct(productId: string, version: number) {
        logger.info('Deleting commercetools product', { productId, version });
        await apiRoot.products().withId({ ID: productId }).delete({ queryArgs: { version } }).execute();
        return true;
    }

    public async searchProducts(query: ProductSearchQuery) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const offset = (page - 1) * limit;
        const filter: string[] = [];

        if (query.category) {
            filter.push(`categories.id:"${query.category}"`);
        }

        logger.info('Searching commercetools products', { query });

        if (query.q) {
            const searchArgs: Record<string, unknown> = {
                limit,
                offset,
                'text.en': query.q,
                fuzzy: true
            };

            const response = await apiRoot.productProjections().search().get({ queryArgs: searchArgs as any }).execute();
            return {
                results: response.body.results,
                total: response.body.total ?? 0,
                limit,
                page
            };
        }

        const listArgs: Record<string, unknown> = {
            limit,
            offset
        };

        if (filter.length > 0) {
            listArgs.where = filter;
        }

        const response = await apiRoot.productProjections().get({ queryArgs: listArgs as any }).execute();

        return {
            results: response.body.results,
            total: response.body.total ?? 0,
            limit,
            page
        };
    }
}
