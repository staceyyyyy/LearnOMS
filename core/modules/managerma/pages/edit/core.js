import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managerma/services/graphql';
import aclService from '@modules/theme/services/graphql';
import * as Yup from 'yup';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, refetch, Content, dataStatusItem, dataReturnType, dataPackageCondition, dataReason,
    } = props;
    const [refundRma] = gqlService.refundRma();
    const [saveRma] = gqlService.saveRma();

    const rma = data.getRmaById;

    const handleRefund = () => {
        const variables = {
            id: rma.id,
        };
        window.backdropLoader(true);
        refundRma({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Refund!',
                    variant: 'success',
                });
                refetch();
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

    const rmaDetail = {
        id: rma.id,
        incrementId: rma.increment_id,
        status: rma.status_code,
        statusLabel: rma.status_label,
        name: rma.customer_name,
        createdAt: rma.created_at,
        email: rma.customer_email,
        updatedAt: rma.updated_at,
        firstname: rma.shipping_address.firstname,
        lastname: rma.shipping_address.lastname,
        street: rma.shipping_address.street,
        city: rma.shipping_address.city,
        region: rma.shipping_address.region,
        postcode: rma.shipping_address.postcode,
        country: rma.shipping_address.country_name,
        telephone: rma.shipping_address.telephone,
        channelOrder: rma.channel_order_increment_id,
        return: rma.return_type,
        refund: rma.refund_type,
        package: rma.package_received_by_loc,
        packageName: rma.package_received_by_loc_name,
        creditmemo: rma.creditmemo,
        item: rma.rma_item,
        message: rma.message,
    };

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveRma({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Update RMA!',
                    variant: 'success',
                });
                refetch();
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

    const formik = useFormik({
        initialValues: {
            id: rma.id,
            status_code: '',
            request: {
                return_type: rma.return_type,
                refund_type: rma.refund_type,
            },
            message: {
                is_customer_notified: false,
                is_visible_on_front: false,
                text: '',
            },
            items: rma.rma_item?.map((item) => ({
                item_id: item.id,
                package_condition: item.package_condition,
                reason: item.reason,
                status_code: item.status_code,
                return_stock: item.return_stock !== 0,
            })),
        },
        validationSchema: Yup.object().shape({
            status_code: Yup.string().required('Required!'),
            request: Yup.object().shape({
                return_type: Yup.string().required('Required!'),
                refund_type: Yup.string().required('Required!'),
            }),
        }),
        onSubmit: (values) => {
            const { items, message, ...valueToSubmit } = values;
            valueToSubmit.items = items.map((item) => ({
                item_id: item.item_id,
                package_condition: item.package_condition,
                reason: item.reason,
                status_code: item.status_code,
                return_stock: item.return_stock ? 1 : 0,
            }));
            valueToSubmit.message = {
                is_customer_notified: message.is_customer_notified ? 1 : 0,
                is_visible_on_front: message.is_visible_on_front ? 1 : 0,
                text: message.text,
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        rmaDetail,
        dataStatusItem,
        dataReturnType,
        dataPackageCondition,
        dataReason,
        handleRefund,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Manage RMA #${router?.query?.id}`,
    };

    const { loading: loadingStatus, data: dataStatusItem } = gqlService.getRmaItemStatusOptions();
    const { loading: loadingReturnType, data: dataReturnType } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/return_type',
    });
    const { loading: loadingPackageCondition, data: dataPackageCondition } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/package_condition',
    });
    const { loading: loadingReason, data: dataReason } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/reason',
    });
    const {
        loading, data, refetch, error,
    } = gqlService.getRmaById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_rma_manage',
    });

    if (loading || loadingStatus || loadingReturnType || loadingPackageCondition || loadingReason || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/sales/managerma';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        refetch,
        dataStatusItem: dataStatusItem.getRmaItemStatusOptions,
        dataReturnType: JSON.parse(dataReturnType.getStoreConfig),
        dataPackageCondition: JSON.parse(dataPackageCondition.getStoreConfig),
        dataReason: JSON.parse(dataReason.getStoreConfig),
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
