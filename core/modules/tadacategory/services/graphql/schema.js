import { gql } from '@apollo/client';

export const getCategoryTadaList = gql`
    query getCategoryTadaList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getCategoryTadaList(
            pageSize: $pageSize,
            currentPage: $currentPage,
        ){
            items {
                entity_id
                channel_category
                name
                parent
                tada_category_id
                tada_catalog_category_id
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export default {
    getCategoryTadaList,
};
