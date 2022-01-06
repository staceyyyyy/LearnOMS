import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productlist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductList = (variables) => useLazyQuery(Schema.getProductList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getProductById = (variables) => useQuery(Schema.getProductById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateProduct = (variables) => useMutation(Schema.updateProduct, {
    variables,
    ...context,
});

export const uploadSource = (variables) => useMutation(Schema.uploadSource, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getProductListBySku = (variables) => useLazyQuery(Schema.getProductListBySku, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getProductAttributes = (variables) => useLazyQuery(Schema.getProductAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const productFetchManual = (variables) => useMutation(Schema.productFetchManual, {
    variables,
    ...context,
});

export const getProductAttributeSetOptions = (variables) => useQuery(Schema.getProductAttributeSetOptions, {
    variables,
    ...context,
});

export const getNewProductAttributes = (variables) => useLazyQuery(Schema.getNewProductAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createProduct = (variables) => useMutation(Schema.createProduct, {
    variables,
    ...context,
});

export const deleteProducts = (variables) => useMutation(Schema.deleteProducts, {
    variables,
    ...context,
});

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadSource,
    downloadSampleCsv,
    getProductListBySku,
    getProductAttributes,
    productFetchManual,
    getProductAttributeSetOptions,
    getNewProductAttributes,
    createProduct,
    deleteProducts,
};
