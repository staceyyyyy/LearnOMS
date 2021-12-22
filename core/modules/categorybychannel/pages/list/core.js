import Layout from '@layout';
import gqlService from '@modules/categorybychannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getCategoryByChannelList, { data, loading }] = gqlService.getCategoryByChannelList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_category_by_channel',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getCategoryByChannelList,
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
