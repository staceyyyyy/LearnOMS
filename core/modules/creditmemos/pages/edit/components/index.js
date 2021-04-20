/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const creditmemosEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/creditmemos')}
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
            <h2 className={classes.titleTop}>View Memo</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipment & Order Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Customer Name</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Status</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Email</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Customer Group</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Name</td>
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
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Payment Information</h5>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Shipping Information</h5>
                        <span className={classes.orderLabel}>Masih Kosong</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items Refunded</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Product</th>
                                <th className={classes.th}>Price</th>
                                <th className={classes.th}>Qty Price</th>
                                <th className={classes.th}>Qty to Refund</th>
                                <th className={classes.th}>Subtotal</th>
                                <th className={classes.th}>Tax Amount</th>
                                <th className={classes.th}>Discount Amount</th>
                                <th className={classes.th}>Row Total</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Order Total</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Refund Totals</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>Subtotal</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Discount</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Shippping & Handling</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Adjusment Refund</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Adjusment Fee</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                            <tr>
                                <td className={clsx(classes.td, classes.th)}>Grand Total</td>
                                <td className={clsx(classes.td, classes.th)}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default creditmemosEditContent;