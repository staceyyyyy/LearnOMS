import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getCompanyList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                company_id
                company_code
                company_name
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

export const getCompanyById = gql`
    query getCompanyById(
        $id: Int!,
    ){
        getCompanyById(
            id: $id
        ){
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany(
        $id: Int!,
        $company_code: String!,
        $company_name: String!,
    ){
        updateCompany(
            id: $id,
            input: {
                company_code: $company_code,
                company_name: $company_name
            }
        ){
            company_code
            company_id
            company_name
            is_new_product
        }
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

export default {
    getCompanyList,
    getCompanyById,
    updateCompany,
    uploadSource,
    downloadSampleCsv,
};
