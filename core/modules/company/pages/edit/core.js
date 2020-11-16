import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const company = data.getCompanyByCode;
    const [code, setCode] = React.useState(company.company_code);
    const [name, setName] = React.useState(company.company_name);
    const [updateCompany] = gqlService.updateCompany();
    const handleSubmit = () => {
        const variables = { id: company.company_id, company_code: code, company_name: name };
        updateCompany({
            variables,
        }).then((res) => {
            console.log(res);
            // need show succes message
        }).catch((e) => {
            console.log(e);
        });
    };

    const contentProps = {
        code,
        setCode,
        name,
        setName,
        handleSubmit,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCompanyByCode({
        code: router && router.query && router.query.id,
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
