import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/curbpickup/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const packlist = data.getPackList;

    const packList = {
        title: packlist.title,
        dataPack: packlist.data,
        createdBy: packlist.created_by,
        checkedBy: packlist.checked_by,
        approvedBy: packlist.approved_by,
        receivedBy: packlist.received_by,

    };

    const contentProps = {
        packList,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPackList({
        id: router && router.query && router.query.slug.map((e) => Number(e)),
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
        <ContentWrapper data={data} {...props} />
    );
};

export default Core;
