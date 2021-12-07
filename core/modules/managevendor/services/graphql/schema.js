import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: CompanyFilterInput,
        $sort: CompanySortInput,
    ){
        getCompanyList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
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
            company_margin
            is_product_approval
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany(
        $id: Int!,
        $company_code: String!,
        $company_name: String!,
        $company_margin: Int,
        $is_new_product: Int,
        $is_product_approval: Int
    ){
        updateCompany(
            id: $id,
            input: {
                company_code: $company_code,
                company_name: $company_name,
                company_margin: $company_margin,
                is_new_product: $is_new_product,
                is_product_approval: $is_product_approval
            }
        ){
            company_code
            company_id
            company_name
            company_margin
            is_new_product
            is_product_approval
        }
    }
`;

export default {
    getCompanyList,
    getCompanyById,
    updateCompany,
};
