import Layout from '@layout';
import gqlService from '@modules/orderqueue/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const router = useRouter();
    const tab_status = router && router.query && router.query.tab_status;
    const [load, setLoad] = React.useState(false);
    const [varExport, setVarExport] = React.useState({});
    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    // const [multideleteChannel] = gqlService.multideleteChannel();
    const [setReallocation] = gqlService.setReallocation();
    const [exportOrderToCsv] = gqlService.exportOrderToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.exportOrderToCsv);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const contentProps = {
        getOrderQueueList,
        // multideleteChannel,
        setReallocation,
        data,
        loading,
        exportOrderToCsv,
        varExport,
        setVarExport,
        tab_status,
    };

    React.useEffect(() => {
        if (tab_status) {
            setLoad(true);
            setTimeout(() => { setLoad(false); }, 1000);
        }
    }, [tab_status]);

    if (load) {
        return (
            <Layout>
                <div style={{
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

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
