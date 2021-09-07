import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderreallocation/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const orderReallocation = data.getOrderReallocationById;
    const [updateReallocation] = gqlService.updateReallocation();

    const handleSubmit = ({
        company,
        location,
    }) => {
        const variables = {
            id: orderReallocation.entity_id,
            company_id: company.company_id,
            loc_code: location.loc_code,
        };
        window.backdropLoader(true);
        updateReallocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit reallocation!',
                variant: 'success',
            });
            setTimeout(() => router.push('/sales/orderreallocation'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            company: orderReallocation.company,
            location: orderReallocation.loc_code,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const reallocationDetail = {
        id: orderReallocation.entity_id,
        shipmentNumber: orderReallocation.increment_id,
        status: orderReallocation.status.label,
        orderDate: orderReallocation.created_at,
        orderNumber: orderReallocation.order_increment_id,
        channelOrderNumber: orderReallocation.channel_order_increment_id,
        item: orderReallocation.order_item,
        history: orderReallocation.status_history,
    };

    const contentProps = {
        formik,
        reallocationDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getOrderReallocationById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
