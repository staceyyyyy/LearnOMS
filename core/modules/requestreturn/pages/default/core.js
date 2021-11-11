/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import gqlService from '@modules/requestreturn/services/graphql';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const [state, setState] = React.useState('');
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = setBackdropLoader;
            window.toastMessage = setToastMessage;
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            orderNumber: '',
            channel: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Required!'),
            orderNumber: Yup.string().required('Required!'),
            channel: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            if (state === 'return') {
                handleReturn(values);
            } else {
                handleSearch(values);
            }
        },
    });

    const handleReturn = (values) => {
        window.backdropLoader(true);
        searchShipmentToReturn({
            variables: {
                customer_email: values.email,
                channel_order_increment_id: values.orderNumber,
                channel_code: values.channel.value,
            },
        });
    };

    const handleSearch = (values) => {
        window.backdropLoader(true);
        getRequestReturnList({
            variables: {
                filter: {
                    customer_email: {
                        eq: values.email,
                    },
                    channel_order_increment_id: {
                        eq: values.orderNumber,
                    },
                    channel_code: {
                        eq: values.channel.value,
                    },
                },
                currentPage: 1,
            },
        });
    };

    const [searchShipmentToReturn] = gqlService.searchShipmentToReturn({
        onCompleted: (res) => {
            if (res && res.searchShipmentToReturn && res.searchShipmentToReturn[0] && res.searchShipmentToReturn[0].entity_id) {
                const id = res && res.searchShipmentToReturn && res.searchShipmentToReturn[0] && res.searchShipmentToReturn[0].entity_id;
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order Found',
                    variant: 'success',
                });
                router.push(`/requestreturn/return/${formik.values.email}/${formik.values.orderNumber}/${formik.values.channel.value}`);
            }
            if (!(res && res.searchShipmentToReturn && res.searchShipmentToReturn[0] && res.searchShipmentToReturn[0].entity_id)) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Data Not Found',
                    variant: 'error',
                });
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const [getRequestReturnList] = gqlService.getRequestReturnList({
        onCompleted: (res) => {
            if (res && res.getRequestReturnList && res.getRequestReturnList.items && res.getRequestReturnList.items[0]) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order Found',
                    variant: 'success',
                });
                router.push(`/requestreturn/request/${formik.values.email}/${formik.values.orderNumber}/${formik.values.channel.value}`);
            }
            if (!(res && res.getRequestReturnList && res.getRequestReturnList.items && res.getRequestReturnList.items[0])) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Data Not Found',
                    variant: 'error',
                });
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const contentProps = {
        formik,
        setState,
    };

    return (
        <>
            <Loading open={backdropLoader} />
            <Content {...contentProps} />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
            />
        </>
    );
};

const Core = (props) => {
    const router = useRouter();

    return (
        <>
            <ContentWrapper {...props} />
        </>
    );
};

export default Core;