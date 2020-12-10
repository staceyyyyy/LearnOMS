import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsPriorityEnable, optionsPriorityType, optionsFramework } from '@modules/virtualstock/helpers';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const virtualStock = data.getVirtualStockById;
    const [updateVirtualStock] = gqlService.updateVirtualStock();

    const handleSubmit = ({
        name,
        notes,
        priorityEnable,
        priorityType,
        channelPriority,
        frameworkPriority,
        minStock,
        location,
    }) => {
        const variables = {
            id: virtualStock.vs_id,
            vs_name: name,
            notes,
            is_priority_enable: priorityEnable.id,
            priority_type: priorityType.name,
            // channel_priority: channelPriority.map((e) => ({ channel_id: e.channel_id })),
            channel_priority: channelPriority.channel_code,
            framework_priority: frameworkPriority.name,
            min_stock: Number(minStock || null),
            location: location.map((e) => ({ loc_id: e.loc_id })),
        };
        updateVirtualStock({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit VirtualStock');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            name: virtualStock.vs_name || '',
            notes: virtualStock.notes || '',
            priorityEnable: optionsPriorityEnable.find((e) => e.id === virtualStock.is_priority_enable),
            priorityType: optionsPriorityType.find((e) => e.name === virtualStock.priority_type) || '',
            channelPriority: virtualStock.channelPriority || '',
            // channelPriority: { channel_id: 8, channel_name: 'Shopee'},
            frameworkPriority: optionsFramework.find((e) => e.name === virtualStock.framework_priority) || '',
            minStock: virtualStock.min_stock || null,
            location: virtualStock.location || [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            notes: Yup.string().nullable(),
            priorityEnable: Yup.object().nullable(),
            priorityType: Yup.object().nullable(),
            channelPriority: Yup.object().nullable(),
            frameworkPriority: Yup.object().nullable(),
            minStock: Yup.number().nullable(),
            location: Yup.array().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getVirtualStockById({
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
