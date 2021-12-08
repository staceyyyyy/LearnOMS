import Layout from '@layout';
import gqlService from '@modules/wavecreate/services/graphql';
import Router from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [createPickByWave] = gqlService.createPickByWave();

    const startPicking = (shipmentId) => {
        const shipment_id = shipmentId.map((item) => item.entity_id);
        window.backdropLoader(true);
        createPickByWave({
            variables: {
                is_auto: false,
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
                setTimeout(() => Router.push(`/pickpack/wavelist/picklist/${res.data.createPickByWave.pick_by_wave.entity_id}`), 250);
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

    const pageConfig = {
        title: 'Create Pick by Wave - Manual Order',
    };

    return (
        <Layout useBreadcrumbs={false} pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
