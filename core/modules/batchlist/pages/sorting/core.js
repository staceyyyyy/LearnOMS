/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable max-len */

import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const {
        data, Content, config = 'single_item', allowManualConfirm, useCamera,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchItemById.pick_by_batch_item;
    const [itemSortingPickByBatch, { loading: loadSorting }] = config === 'multiple_item' ? gqlService.multipleItemSortingPickByBatch() : gqlService.itemSortingPickByBatch();
    const [doneSortingPickByBatch] = gqlService.doneSortingPickByBatch();

    let [name, setName] = React.useState('-');
    let [sku, setSku] = React.useState('-');
    let [slot, setSlot] = React.useState('-');
    let [dataMultiple, setDataMultiple] = React.useState([]);

    const handleDetect = (code) => {
        const variables = {
            batch_id: picklist.entity_id,
            barcode: code,
        };
        window.backdropLoader(true);
        itemSortingPickByBatch({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success update qty!',
                    variant: 'success',
                });
                if (config === 'single_item') {
                    getDataSorting(res);
                }
                if (config === 'multiple_item') {
                    getDataSortingMultiple(res);
                    setSku(code);
                }
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

    const handleDoneSorting = () => {
        const variables = {
            batch_id: pickList.id,
        };
        window.backdropLoader(true);
        doneSortingPickByBatch({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Start Sorting',
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/${pickList.id}`);
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

    const getDataSorting = (res) => {
        name = (res
                && res.data
                && res.data.itemSortingPickByBatch
                && res.data.itemSortingPickByBatch.pick_by_batch_sort
                && res.data.itemSortingPickByBatch.pick_by_batch_sort.name)
            || '-';
        sku = (res
                && res.data
                && res.data.itemSortingPickByBatch
                && res.data.itemSortingPickByBatch.pick_by_batch_sort
                && res.data.itemSortingPickByBatch.pick_by_batch_sort.sku)
            || '-';
        slot = (res
                && res.data
                && res.data.itemSortingPickByBatch
                && res.data.itemSortingPickByBatch.pick_by_batch_sort
                && res.data.itemSortingPickByBatch.pick_by_batch_sort.slot_no)
            || '-';

        setName(name);
        setSku(sku);
        setSlot(slot);
    };

    const getDataSortingMultiple = (res) => {
        name = (res
                && res.data
                && res.data.multipleItemSortingPickByBatch
                && res.data.multipleItemSortingPickByBatch.length
                && res.data.multipleItemSortingPickByBatch[0].name)
            || '-';
        sku = (res
                && res.data
                && res.data.multipleItemSortingPickByBatch
                && res.data.multipleItemSortingPickByBatch.length
                && res.data.multipleItemSortingPickByBatch[0].sku)
            || '-';
        dataMultiple = (res
                && res.data
                && res.data.multipleItemSortingPickByBatch
                && res.data.multipleItemSortingPickByBatch.length
                && res.data.multipleItemSortingPickByBatch)
            || [];
        setName(name);
        setSku(sku);
        setDataMultiple(dataMultiple);
    };

    const pickList = {
        parentId: picklist.parent_id,
        id: picklist.entity_id,
    };

    const formik = useFormik({
        initialValues: {
            sku: '',
        },
        validationSchema: Yup.object().shape({
            sku: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const variables = {
                batch_id: picklist.entity_id,
                sku: values.sku,
            };
            window.backdropLoader(true);
            itemSortingPickByBatch({
                variables,
            })
                .then((res) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Success update qty!',
                        variant: 'success',
                    });
                    if (config === 'single_item') {
                        getDataSorting(res);
                    }
                    if (config === 'multiple_item') {
                        getDataSortingMultiple(res);
                        setSku(values.sku);
                    }
                    formik.resetForm();
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const contentProps = {
        pickList,
        handleDetect,
        handleDoneSorting,
        name,
        sku,
        slot,
        config,
        dataMultiple,
        loadSorting,
        allowManualConfirm,
        formik,
        useCamera,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Pick by Batch - Sorting #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfigSorting();
    const { loading: loadingConfigAllowManual, data: dataConfigAllowManual } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/allow_manual_confirm_pick',
    });
    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/use_camera_to_scan',
    });
    const { loading, data } = gqlService.getPickByBatchItemById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading || loadingConfig || loadingConfigAllowManual || loadingConfigCamera) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data || !dataConfig) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/pickpack/batchlist');
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

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                useCamera={dataConfigCamera.getStoreConfig === '1'}
                config={dataConfig.getStoreConfig}
                allowManualConfirm={dataConfigAllowManual.getStoreConfig === '1'}
                {...props}
            />
        </Layout>
    );
};

export default Core;
