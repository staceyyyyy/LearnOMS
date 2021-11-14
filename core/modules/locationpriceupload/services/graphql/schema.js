import { gql } from '@apollo/client';

export const uploadPriceLocation = gql`
    mutation uploadPriceLocation($binary: String!) {
        uploadPriceLocation(input: { binary: $binary })
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const getPriceLocationList = gql`
    query getPriceLocationList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: PriceLocationFilterInput
        $sort: PriceLocationSortInput
        $search: String
    ) {
        getPriceLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                company_id
                company_name
                loc_id
                loc_name
                price
                price_id
                sku
                special_from_date
                special_price
                special_to_date
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

export default {
    uploadPriceLocation,
    downloadSampleCsv,
    getPriceLocationList,
};
