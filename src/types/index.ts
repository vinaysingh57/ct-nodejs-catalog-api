export interface LocalizedString {
    [locale: string]: string;
}

export interface ImageInput {
    url: string;
    label?: string;
    dimensions?: {
        w: number;
        h: number;
    };
}

export interface PriceInput {
    value: {
        currencyCode: string;
        centAmount: number;
    };
    country?: string;
}

export interface MasterVariantInput {
    sku?: string;
    attributes?: Record<string, unknown>;
    prices?: PriceInput[];
    images?: ImageInput[];
}

export interface ReferenceInput {
    typeId: string;
    id?: string;
    key?: string;
}

export interface ProductTypeReferenceInput {
    typeId: string;
    key?: string;
    id?: string;
}

export interface ProductCreateInput {
    name: LocalizedString;
    slug: LocalizedString;
    productTypeKey?: string;
    productType?: ProductTypeReferenceInput;
    description?: LocalizedString;
    categoryKeys?: string[];
    categories?: ReferenceInput[];
    masterVariant?: MasterVariantInput;
    variants?: MasterVariantInput[];
    publish?: boolean;
}

export interface ProductUpdateAction {
    action: string;
    [key: string]: unknown;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
    version: number;
    actions?: ProductUpdateAction[];
}

export interface ProductSearchQuery {
    q?: string;
    category?: string;
    page?: number;
    limit?: number;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
