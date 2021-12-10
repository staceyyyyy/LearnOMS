import Layout from '@layout';
import gqlService from '@modules/productcategory/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getProductCategoryList, { data, loading }] = gqlService.getProductCategoryList();
    const [multidisableProductCategory] = gqlService.multidisableProductCategory();
    const [pullProductCategory] = gqlService.pullProductCategory();

    const contentProps = {
        getProductCategoryList,
        multidisableProductCategory,
        pullProductCategory,
        data,
        loading,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
