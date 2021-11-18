import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/creditmemos/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        parentId,
    } = props;
    const router = useRouter();
    const { creditmemo, order } = data.prepareNewMemo;
    const [grandTotal, setGrandTotal] = React.useState(creditmemo.grand_total);

    const [createCreditMemo] = gqlService.createCreditMemo();
    const [calculate] = gqlService.calculateCreditMemoTotals();

    const handleCalculate = (values) => {
        window.backdropLoader(true);
        const {
            action, comment_customer_notify, send_email, ...restValues
        } = values;
        const variables = {
            request_id: parentId,
            input: {
                ...restValues,
                shipping_amount: Number(restValues.shipping_amount),
                adjustment_positive: Number(restValues.adjustment_positive),
                adjustment_negative: Number(restValues.adjustment_negative),
                comment_customer_notify: comment_customer_notify ? 1 : 0,
                send_email: send_email ? 1 : 0,
            },
        };
        calculate({
            variables,
        }).then(({ data: res }) => {
            const { calculateCreditMemoTotals } = res;
            setGrandTotal(calculateCreditMemoTotals.grand_total);
            window.backdropLoader(false);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleSubmit = (variables) => {
        window.backdropLoader(true);
        createCreditMemo({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Creditmemo created',
                variant: 'success',
            });
            router.push(`/sales/managerma/edit/${parentId}`);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    // eslint-disable-next-line no-useless-escape
    const numberFormat = (value) => Number(value.replace(/[^0-9\.-]+/g, ''));
    const formik = useFormik({
        initialValues: {
            shipping_amount: numberFormat(creditmemo.shipping_amount),
            adjustment_positive: numberFormat(creditmemo.adjustment_refund),
            adjustment_negative: numberFormat(creditmemo.adjustment_fee),
            comment_text: '',
            comment_customer_notify: false,
            send_email: false,
        },
        validationSchema: Yup.object().shape({
            shipping_amount: Yup.number().required(),
            adjustment_positive: Yup.number().required(),
            adjustment_negative: Yup.number().required(),
        }),
        onSubmit: (values) => {
            const {
                action, comment_customer_notify, send_email, ...restValues
            } = values;
            const variables = {
                request_id: parentId,
                input: {
                    ...restValues,
                    shipping_amount: Number(restValues.shipping_amount),
                    adjustment_positive: Number(restValues.adjustment_positive),
                    adjustment_negative: Number(restValues.adjustment_negative),
                    comment_customer_notify: comment_customer_notify ? 1 : 0,
                    send_email: send_email ? 1 : 0,
                },
            };
            if (action === 'submit') {
                handleSubmit(variables);
            } else if (action === 'calculate') {
                handleCalculate(values);
            }
        },
    });

    const creditmemoDetail = {
        entityId: order.entity_id,
        status: order.status,
        statusLabel: order.statusLabel,
        channelName: order.channel_name,
        channelCode: order.channel_code,
        orderNumber: order.channel_order_increment_id,
        orderDate: order.channel_order_date,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerGroup: order.customer_group,
        billing: order.billing_address,
        shipping: order.shipping_address,
        paymentMethod: order.channel_payment_method,
        shippingMethod: order.channel_shipping_method,
        items: creditmemo.items,
        subtotal: creditmemo.subtotal,
        discount: creditmemo.discount,
        refundShipping: creditmemo.shipping_amount,
        adjustRefund: creditmemo.adjustment_refund,
        adjustFee: creditmemo.adjustment_fee,
    };

    const contentProps = {
        formik,
        creditmemoDetail,
        handleCalculate,
        parentId,
        grandTotal,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.prepareNewMemo({
        request_id: router && router.query && Number(router.query.request_id),
    });

    if (loading) {
        return (
            <Layout>
                <div style={{
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

    if (!data && error) {
        window.toastMessage({
            open: true,
            text: error.message,
            variant: 'error',
        });
        setTimeout(() => { router.push(`/sales/managerma/edit/${router && router.query && Number(router.query.request_id)}`); }, 1500);
        return (
            <Layout>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Error
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper
                parentId={router && router.query && Number(router.query.request_id)}
                data={data}
                {...props}
            />
        </Layout>
    );
};

export default Core;
