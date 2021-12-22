import { gql } from '@apollo/client';

const overrideStock = `
    entity_id
    vs_id{
        vs_id
        vs_name
    }
    sku
    qty
    reason
`;

export const getVirtualStockQuantityList = gql`
    query getVirtualStockQuantityList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: VirtualStockQuantityFilterInput
        $sort: VirtualStockQuantitySortInput
    ) {
        getVirtualStockQuantityList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                vs_id {
                    vs_id
                    vs_name
                }
                sku
                qty
                reason
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getVirtualStockQuantityById = gql`
    query getVirtualStockQuantityById(
        $id: Int!,
    ){
        getVirtualStockQuantityById(
            id: $id
        ){
            ${overrideStock}
        }
    }
`;

export const createVirtualStockQuantity = gql`
    mutation createVirtualStockQuantity(
        $vs_id: Int,
        $sku: String,
        $qty: Int,
        $reason: String,
    ){
        createVirtualStockQuantity(
            input: {
                vs_id: $vs_id,
                sku: $sku,
                qty: $qty,
                reason: $reason,
            }
        ){
            ${overrideStock}
        }
    }
`;

export const updateVirtualStockQuantity = gql`
    mutation updateVirtualStockQuantity(
        $id: Int!,
        $vs_id: Int,
        $sku: String,
        $qty: Int,
        $reason: String,
    ){
        updateVirtualStockQuantity(
            id: $id,
            input: {
                vs_id: $vs_id,
                sku: $sku,
                qty: $qty,
                reason: $reason,
            }
        ){
            ${overrideStock}
        }
    }
`;

export const uploadVirtualStockQuantity = gql`
    mutation uploadVirtualStockQuantity($binary: String!) {
        uploadVirtualStockQuantity(input: { binary: $binary }) {
            is_success
            attachment_url
        }
    }
`;

export const getActivity = gql`
    query getActivity($code: String!, $by_session: Boolean!) {
        getActivity(code: $code, by_session: $by_session) {
            activity_id
            activity_code
            run_status
            data_total
            data_processed
            started_at
            snapshot_at
            finished_at
            run_by
            run_type
            run_by_name
            attachment
            error_message
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;
export const syncOverrideStockToMarketplace = gql`
    mutation syncOverrideStockToMarketplace($store_id: String!) {
        syncOverrideStockToMarketplace(store_id: $store_id)
    }
`;

export const multideleteVirtualStockQuantity = gql`
    mutation multideleteVirtualStockQuantity($id: [Int!]!) {
        multideleteVirtualStockQuantity(id: $id)
    }
`;

export const deleteAllVirtualStock = gql`
    mutation {
        deleteAllVirtualStock
    }
`;

export default {
    getVirtualStockQuantityList,
    getVirtualStockQuantityById,
    createVirtualStockQuantity,
    updateVirtualStockQuantity,
    downloadSampleCsv,
    uploadVirtualStockQuantity,
    getActivity,
    syncOverrideStockToMarketplace,
    multideleteVirtualStockQuantity,
    deleteAllVirtualStock,
};
