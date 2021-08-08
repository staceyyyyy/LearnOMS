import { gql } from '@apollo/client';

const productList = `
    items {
        entity_id
        product_name
        sku
        product_price
        product_special_price
        product_status {
        label
        }
    }
    total_count
    page_info {
        page_size
        current_page
        total_pages
    }
`;

export const getProductList = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ProductFilterInput,
        $sort: ProductSortInput,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            ${productList}
        }
    }
`;

export const getProductById = gql`
    query getProductById(
        $id: Int!,
    ){
        getProductById(
            id: $id
        ){
            id
            product_status {
                value
                label
            }
            attribute_set_name
            name
            sku
            price_range {
            maximum_price {
                regular_price {
                        value
                    }
                }
            }
            special_price
            special_from_date
            special_to_date
            weight
            visibility
            description {
                html
            }
            sourcing{
                loc_name
                qty_total
                qty_reserved
                qty_saleable
            }
        }
    }
`;

export const updateProduct = gql`
    mutation updateProduct(
        $id: Int!,
        $status: Int,
        $price: Int,
        $special_price: Int,
        $special_price_from: String,
        $special_price_to: String,
        
    ){
        updateProduct(
            id: $id,
            input: {
                status: $status,
                price: $price,
                special_price: $special_price,
                special_price_from: $special_price_from,
                special_price_to: $special_price_to,
            }
        )
    }
`;

export const uploadSource = gql`
    mutation uploadSource(
        $binary: String!,
    ){
        uploadSource(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export const getProductListBySku = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage:Int!,
        $querySearch: String,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter:{
                sku:{
                    like: $querySearch
                }
            },
        ){
            ${productList}
        }
    }
`;

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadSource,
    downloadSampleCsv,
    getProductListBySku,
};
