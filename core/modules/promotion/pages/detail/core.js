import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/promotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'promotion_modify',
    });
    const { loading, data, error } = gqlService.getPromotionById({
        variables: { id: router && router.query && Number(router.query.id) },
    });

    const pageConfig = {
        title: 'Promotion Detail',
    };

    if (loading || aclCheckLoading) {
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Loading...
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/marketing/promotion';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data: data.getPromotionById,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
