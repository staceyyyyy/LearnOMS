import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, dataLocation, refetch,
    } = props;
    const router = useRouter();
    const mpData = data.getAvailableMpToConnect;

    const [mpActive, setMpActive] = React.useState({});

    // mutation
    const [registerMarketplaceChannel] = gqlService.registerMarketplaceChannel();
    const [updateMarketplaceLocation] = gqlService.updateMarketplaceLocation();
    const [reconnectMarketplaceChannel] = gqlService.reconnectMarketplaceChannel();
    const [disconnectMarketplaceChannel] = gqlService.disconnectMarketplaceChannel();

    const schemaObj = (schemaType) => {
        const initialValue = {};
        const type = {
            string: Yup.string().required('Required!'),
            number: Yup.number().required('Required!'),
        };
        if (mpActive?.credentials?.type === 'oauth2') {
            return initialValue;
        }
        return mpActive?.credentials?.fields?.reduce(
            (obj, item) => ({
                ...obj,
                [item.name]: schemaType === 'validation' ? type[item.type] : '',
            }),
            initialValue,
        );
    };

    const handleSubmit = (input) => {
        const variables = { input };
        window.backdropLoader(true);
        registerMarketplaceChannel({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success register marketplace!',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleUpdateLocation = (variables) => {
        window.backdropLoader(true);
        updateMarketplaceLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success register marketplace!',
                    variant: 'success',
                });
                setTimeout(() => router.push(mpActive.credentials?.url), 250);
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

    const handleDisconnect = (mp) => {
        window.backdropLoader(true);
        disconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success disconnect to marketplace!',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleReconnect = (mp) => {
        window.backdropLoader(true);
        reconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success reconnect to marketplace!',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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
            location: [],
            ...schemaObj(),
        },
        validationSchema: Yup.object().shape({
            location: Yup.array().of(Yup.object()).min(1).required('Required!'),
            ...schemaObj('validation'),
        }),
        onSubmit: (values) => {
            const { location, ...restValues } = values;
            const valueToSubmit = {
                brand_id: mpData.brand_id,
                loc_id: location.map((loc) => Number(loc.loc_id)),
                marketplace_code: mpActive.marketplace_code,
            };
            if (mpActive?.credentials?.type === 'oauth2') {
                handleUpdateLocation(valueToSubmit);
            } else {
                const keys = Object.keys(restValues);
                if (keys.length) {
                    const credentials = {};
                    keys.forEach((key) => {
                        let data_type = 'string';
                        let value = String(restValues[key]);
                        if (mpActive.marketplace_code === 'TKPD' && (key === 'fs_id' || key === 'shop_id')) {
                            data_type = 'integer';
                            value = Number(restValues[key]);
                        }
                        credentials[key] = { data_type, value };
                    });
                    valueToSubmit.credentials = JSON.stringify(credentials);
                } else {
                    valueToSubmit.credentials = '{}';
                }
                handleSubmit(valueToSubmit);
            }
        },
    });

    const contentProps = {
        formik,
        mpData,
        dataLocation: dataLocation.getLocationList.items,
        mpActive,
        setMpActive,
        handleDisconnect,
        handleReconnect,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const pageConfig = {
        title: `View Marketplace Brand #${router?.query?.id}`,
    };
    const [updateConnectedMarketplace, { loading }] = gqlService.updateConnectedMarketplace({});
    const [getLocationList, { loading: loadingLocation, data: dataLocation }] = gqlService.getLocationList();
    const [getAvailableMpToConnect, {
        loading: loadingMp, data, refetch, error,
    }] = gqlService.getAvailableMpToConnect({
        store_id: router && router.query && Number(router.query.id),
        callback_url: router && router.asPath,
    });

    React.useEffect(() => {
        updateConnectedMarketplace({
            variables: { store_id: router && router.query && Number(router.query.id) },
        }).then(() => {
            getLocationList();
            getAvailableMpToConnect();
        });
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    if (loading || loadingMp || loadingLocation || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Loading get Marketplaces . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/configurations/marketplacebrand';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        dataLocation,
        refetch,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
