/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const shipmentEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/shipment')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>Detail Shipment</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipment & Order Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Ship From</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Last Update</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Channel Order Number</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Status</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Email</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Billing Address</h5>
                        <span className={classes.orderLabel}>
                            Masih Kosong
                        </span>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                        <span className={classes.orderLabel}>
                            Masih Kosong
                        </span>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Shipping Adress</h5>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                        <span className={classes.orderLabel}>
                            Masih Kosong
                        </span>
                        <span className={classes.orderLabel}>Masih kosong</span>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items Shipped</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Unit Price</th>
                                <th className={classes.th}>QTY</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipping & Tracking Information</h5>
                    <span className={classes.orderLabel}>Shipping Method</span>
                    <span className={classes.orderLabel}>Masih Kosong</span>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Date</th>
                                <th className={classes.th}>Courier</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Tracking Number</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Status history</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Date</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Note</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default shipmentEditContent;