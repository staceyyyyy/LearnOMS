import Layout from '@layout';
import gqlService from '@modules/batchcreate/services/graphql';
import Router from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [createPickByBatchManually] = gqlService.createPickByBatchManually();

    const startPicking = (shipmentId) => {
        const shipment_id = shipmentId.map((item) => item.entity_id);
        window.backdropLoader(true);
        createPickByBatchManually({
            variables: {
                type: 'shipment',
                shipment_id,
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success auto generate!',
                    variant: 'success',
                });
                setTimeout(() => Router.push(`/pickpack/batchlist/edit/picklist/${res.data.createPickByBatch.pick_by_batch.entity_id}`), 250);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };
    const contentProps = {
        getStoreShipmentList,
        data,
        loading,
        startPicking,
    };

    return (
        <Layout useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
