import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, getProductAttributes, setLoadingState,
    } = props;
    const router = useRouter();
    const [updateProduct] = gqlService.updateProduct();
    const productDetail = data.getProductAttributes;
    const [attribute_set_id, set_attribute_set_id] = React.useState(productDetail.attribute_set_id);

    const onChangeAttribute = (e) => {
        setLoadingState(true);
        const { value } = e.target;
        set_attribute_set_id(value);
        getProductAttributes({
            variables: {
                id: router && router.query && Number(router.query.id),
                attribute_set_id: Number(value),
            },
        });
        setLoadingState(false);
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        const input_image = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < productDetail.groups.length; i++) {
            const group = productDetail.groups[i];
            group.attributes
                .filter((att) => att.frontend_input !== 'image')
                .map((attribute) => {
                    if (attribute.is_required) {
                        valid.push([attribute.attribute_code, Yup.string().required('This field is Required!')]);
                    }
                    if (attribute.frontend_input === 'multiselect' && attribute.attribute_value?.length) {
                        const values = [];
                        if (attribute.attribute_value) {
                            attribute.attribute_value.split(',').forEach((item) => {
                                values.push(attribute.attribute_options.find((o) => o.value === item));
                            });
                        }
                        return init.push([attribute.attribute_code, values]);
                    }
                    if (attribute.frontend_input === 'boolean') {
                        const values = attribute.attribute_value === '1';
                        return init.push([attribute.attribute_code, values]);
                    }
                    return init.push([attribute.attribute_code, attribute.attribute_value]);
                });
            group.attributes
                .filter((att) => att.frontend_input === 'image')
                .map((attribute) => attribute.images.map((image) => input_image.push({
                    id: image.id,
                    url: image.url,
                    binary: '',
                    position: image.position,
                    types: image.types,
                    is_deleted: false,
                })));
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
            image: input_image,
        };
    };

    const handleSubmit = (value) => {
        const variables = {
            ...value,
        };
        window.backdropLoader(true);
        updateProduct({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success Update Product!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/product/productlist'), 250);
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
            ...initValue().init,
            input_image: initValue().image,
        },
        validationSchema: Yup.object().shape({
            ...initValue().valid,
        }),
        onSubmit: (values) => {
            const { input_image, ...restValues } = values;
            const valueToSubmit = {
                id: router && router.query && Number(router.query.id),
                input: Object.keys(restValues).map((key) => {
                    let attribute_value = restValues[key] || '';
                    if (typeof restValues[key] === 'object') {
                        attribute_value = restValues[key]?.map((val) => val.value).join(',') || '';
                    } else if (typeof restValues[key] === 'boolean') {
                        attribute_value = restValues[key] ? '1' : '0';
                    }
                    return {
                        attribute_code: key,
                        attribute_value,
                    };
                }),
            };
            valueToSubmit.input = [{ attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) }, ...valueToSubmit.input];
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image.map((input) => {
                    const {
                        url, name, size, ...restInput
                    } = input;
                    return restInput;
                });
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode, file } = files[0];
        const input = formik.values.input_image;
        input.push({
            binary: baseCode,
            types: [],
            position: 0,
            is_deleted: false,
            name: file.name,
            size: `${file.size / 1000} KB`,
        });
        formik.setFieldValue('input_image', input);
    };

    const contentProps = {
        formik,
        productDetail,
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Product Detail #${router?.query?.id}`,
    };

    const [loadingState, setLoadingState] = React.useState(false);
    const [getProductAttributes, productAttributes] = gqlService.getProductAttributes();
    const {
        loading, data, called, error,
    } = productAttributes;

    React.useEffect(() => {
        getProductAttributes({
            variables: { id: router && router.query && Number(router.query.id) },
        });
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    if (loading || !called || aclCheckLoading || loadingState) {
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
                    Loading...
                </div>
            </Layout>
        );
    }

    if (called && !data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                getProductAttributes={getProductAttributes}
                setLoadingState={setLoadingState}
                {...props}
            />
        </Layout>
    );
};

export default Core;
