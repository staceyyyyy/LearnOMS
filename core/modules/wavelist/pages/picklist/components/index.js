import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/wavelist/pages/picklist/components/style';

const BatchListPickListContent = (props) => {
    const {
        waveList,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getValueStatus = (status) => {
        if (status === 'new') {
            return classes.green;
        }
        if (status === 'pick_in_progress' || status === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status === 'pick_uncomplete') {
            return classes.red;
        }
        return classes.grey;
    };

    const getIcon = (qty_picked, qty_to_pick) => {
        if (qty_to_pick === qty_picked) {
            return classes.checkmark;
        }
        return classes.loading;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/pickpack/wavelist')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {`Wave #${waveList.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(waveList.statusValue)}>{waveList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Date : ${waveList.date}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Picker : ${waveList.picker}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total Order : ${waveList.totalShipments}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total SKU : ${waveList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {waveList.items.map((e) => (
                    <div className={classes.content} key={e.entity_id}>
                        <a href={`/pickpack/wavelist/picklist/item/${e.entity_id}`}>
                            <div className={classes.gridList}>
                                <div>
                                    <h5
                                        className={classes.titleList}
                                    >
                                        SKU
                                    </h5>
                                    <h5 className={classes.bodyList} style={{ textAlign: 'left' }}>{e.sku}</h5>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5
                                        className={classes.titleList}
                                    >
                                        QTY
                                    </h5>
                                    <h5 className={classes.bodyList}>
                                        {`${e.qty_picked}/${e.qty_to_pick}`}
                                    </h5>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5
                                        className={classes.titleList}
                                    >
                                        LOCATION
                                    </h5>
                                    <h5 className={classes.bodyList}>{e.bin_code}</h5>
                                    {e.is_confirmed}
                                </div>
                                <h5 className={classes.bodyList} style={{ textAlign: 'right' }}>
                                    {e.is_confirmed ? (
                                        <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                    ) : <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_barcode.svg" />}
                                </h5>
                            </div>
                        </a>
                    </div>
                ))}
            </Paper>
        </>
    );
};

export default BatchListPickListContent;
