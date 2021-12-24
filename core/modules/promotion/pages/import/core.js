/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/promotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const router = useRouter();
    const {
        Content,
    } = props;
    const pageConfig = {
        title: 'Promotion Import',
    };

    const [importPromotion] = gqlService.importPromotion();
    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'promotion_sample' });
    const [errorHtml, setErrorHtml] = React.useState('');

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
        importPromotion({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Import Success',
                variant: 'success',
            });
            setTimeout(() => { router.push('/marketing/promotion'); }, 1000);
        }).catch((e) => {
            window.backdropLoader(false);
            const regex = /(<([^>]+)>)/ig;
            if (regex.test(e.message)) {
                setErrorHtml(e.message);
                window.toastMessage({
                    open: true,
                    text: 'Error',
                    variant: 'error',
                });
            } else {
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            }
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
            setErrorHtml('');
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        setErrorHtml('');
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const binarySplited = baseCode.split(',');
        const binary = binarySplited[binarySplited.length - 1];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', binary);
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'promotion_create',
    });

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        errorHtml,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
