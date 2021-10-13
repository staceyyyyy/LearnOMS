/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/edit/picklist/components/style';

const PickListEditContent = (props) => {
    const {
        pickList, formikDone,
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
        return classes.gray;
    };

    const getColor = (isConfirmed, picked, toPick) => {
        if (isConfirmed && (picked === toPick)) {
            return { backgroundColor: '#ECF0FB' };
        }
        return { backgroundColor: '#FFFFFF' };
    };

    return (
        <>
            <div style={{ position: 'relative' }}>
                <Button
                    className={classes.btnBack}
                    onClick={() => router.push(`/pickpack/batchlist/edit/${pickList.parentId}`)}
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
                    {`Pick List ${pickList.id}`}
                </h2>
                <h2 className={classes.titleTopSmall}>
                    {`Batch #${pickList.parentId}`}
                </h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(pickList.statusValue)}>{pickList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Date : ${pickList.date || '-'}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Total SKU : ${pickList.totalItems}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`Picker : ${pickList.picker || '-'}`}</h5>
                        </div>
                    </div>
                </div>
                {pickList.items.map((e) => (
                    <div className={classes.content} style={getColor(e.is_confirmed, e.qty_picked, e.qty_to_pick)}>
                        <Link href={`/pickpack/batchlist/picklistitem/${e.entity_id}`}>
                            <a>
                                <div className={classes.gridList}>
                                    <h5 className={classes.titleList} style={{ textAlign: 'left' }}>
                                        <span className={classes.th}>SKU</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.sku}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>QTY</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{`${e.qty_picked}/${e.qty_to_pick}`}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>LOCATION</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.bin_code || '-'}</span>
                                    </h5>
                                    <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                        {!(e.is_confirmed) ? (
                                            <img className={classes.iconBarcode} src="/assets/img/iconbarcode.svg" alt="" />
                                        ) : (
                                            <>
                                                {(e.qty_picked === e.qty_to_pick) ? (
                                                    <span className={classes.checkmark} />
                                                ) : (
                                                    <span className={classes.exclamation} />
                                                )}
                                            </>
                                        )}
                                    </h5>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
                <div className={classes.footer}>
                    <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                        <h2>{pickList.itemsLeft}</h2>
                        <span>items left to pick</span>
                    </div>
                    {(pickList.itemsLeft === 0) ? (
                        <button
                            className={classes.btnFooter}
                            type="submit"
                            onClick={formikDone.handleSubmit}
                        >
                            Done Picking
                        </button>
                    ) : (
                        <button
                            className={classes.btnFooterDisabled}
                            disabled
                        >
                            Done Picking
                        </button>
                    )}
                </div>
            </Paper>
        </>
    );
};

export default PickListEditContent;
