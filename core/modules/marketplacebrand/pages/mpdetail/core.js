import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getMarketplaceCredentials({
        store_detail_id: router && router.query && Number(router.query.store_id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/configurations/marketplacebrand';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data: data.getMarketplaceCredentials,
    };

    return (
        <Layout>
            <Content {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
