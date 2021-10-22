import Layout from '@layout';
import gqlService from '@modules/wavelist/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getPickByWaveStatus();
    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    if (loadingOptionStatus) {
        return (
            <Layout useBreadcrumbs={false}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading
                </div>
            </Layout>
        );
    }

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
        optionsStatus: optionsStatus.getPickByWaveStatus,
    };

    return (
        <Layout useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
