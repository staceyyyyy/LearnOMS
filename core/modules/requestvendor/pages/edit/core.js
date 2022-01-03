/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/requestvendor/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const Vendor = data.getVendorRequestById;
    const [vendorRequestApprove] = gqlService.vendorRequestApprove();
    const [vendorRequestNotApprove] = gqlService.vendorRequestNotApprove();

    const handleApprove = () => {
        const variables = {
            id: vendor.id,
        };
        window.backdropLoader(true);
        vendorRequestApprove({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Approved',
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/requestvendor'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleNotApprove = () => {
        const variables = {
            id: vendor.id,
        };
        window.backdropLoader(true);
        vendorRequestNotApprove({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Not Approved',
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/requestvendor'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const vendor = {
        id: Vendor.entity_id,
        firstname: Vendor.first_name,
        lastname: Vendor.last_name,
        email: Vendor.email,
        street: Vendor.company_street,
        countryId: Vendor.company_country_id,
        countryName: Vendor.company_country_name,
        region: Vendor.company_region,
        city: Vendor.company_city,
        phone: Vendor.no_telephone,
        companyName: Vendor.company_name,
        companyCode: Vendor.company_code,
        status: Vendor.status,
        statusLabel: Vendor.status_label,
    };

    const contentProps = {
        vendor,
        handleApprove,
        handleNotApprove,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getVendorRequestById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'requestVendor',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/vendorportal/requestvendor';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
