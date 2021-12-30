import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/printoms/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const shippingLabel = data.printShippingLabel;
    const smallArray = (arr) => {
        const newArr = arr.slice();
        const res = [];
        while (newArr.length > 0) {
            const small = newArr.splice(0, 4);
            res.push(small);
        }
        return res;
    };

    const contentProps = {
        shippingLabel: smallArray(shippingLabel),
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.printShippingLabel({
        id: router && router.query && router.query.slug.map((e) => Number(e)),
    });

    if (loading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    return <ContentWrapper data={data} {...props} />;
};

export default Core;
