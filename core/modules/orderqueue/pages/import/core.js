import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderqueue/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Bulk Order Reallocation',
    };

    const router = useRouter();
    const [bulkOrderReallocation] = gqlService.bulkOrderReallocation();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'bulk_order_reallocation' });
    const tab_status = router && router.query && router.query.tab_status;

    useEffect(() => {
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const handleSubmit = ({
        binary,
    }) => {
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        bulkOrderReallocation({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.bulkOrderReallocation,
                variant: 'success',
            });
            setTimeout(() => router.push('/order/orderqueue'), 250);
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
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const binarySplited = baseCode.split(',');
        const binary = binarySplited[binarySplited.length - 1];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', binary);
    };

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        tab_status,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
