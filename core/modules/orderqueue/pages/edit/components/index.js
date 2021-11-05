/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/orderqueue/pages/edit/components/style';
import { formatPriceNumber } from '@helper_currency';

const OrderQueueEditContent = (props) => {
    const {
        formikAllocation,
        formikNew,
        orderQueue,
        parent,
        aclCheckData,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };

    const iconFilter = (channel_code) => {
        if (channel_code) {
            if (channel_code.toLowerCase().includes('swi')) {
                return '/assets/img/dashboard/channel_official.png';
            }
            if (channel_code.toLowerCase().includes('bklp')) {
                return '/assets/img/dashboard/channel_bukalapak.svg';
            }
            if (channel_code.toLowerCase().includes('blib')) {
                return '/assets/img/dashboard/channel_blibli.png';
            }
            if (channel_code.toLowerCase().includes('jdid')) {
                return '/assets/img/dashboard/channel_jd.png';
            }
            if (channel_code.toLowerCase().includes('lzda')) {
                return '/assets/img/dashboard/channel_lazada.png';
            }
            if (channel_code.toLowerCase().includes('shpe')) {
                return '/assets/img/dashboard/channel_shopee.png';
            }
            if (channel_code.toLowerCase().includes('srcl')) {
                return '/assets/img/dashboard/channel_sirclo.png';
            }
            if (channel_code.toLowerCase().includes('tkpd')) {
                return '/assets/img/dashboard/channel_tokopedia.png';
            }
            if (channel_code.toLowerCase().includes('zlra')) {
                return '/assets/img/dashboard/channel_zalora.png';
            }
            return `/assets/img/dashboard/${channel_code}.png`;
        }
        return null;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(parent ? `/sales/${parent}` : '/sales/orderqueue')}
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
            <h2 className={classes.titleTop}>
                {`Detail Shipment #${orderQueue.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(orderQueue.status)}>
                            {orderQueue.status}
                        </div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={iconFilter(orderQueue.channelCode)}
                                alt=""
                                className="iconHeader"
                                onError={(event) => event.target.style.display = 'none'}
                            />
                            {orderQueue.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{orderQueue.channelOrderId}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Date
                        </h5>
                        <span className="spanHeader">{orderQueue.createdAt}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Last Update
                        </h5>
                        <span className="spanHeader">{orderQueue.lastUpdated}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Acceptance Deadline
                        </h5>
                        <span className="spanHeader">{orderQueue.acceptanceDeadline}</span>
                    </div>
                </div>

                {orderQueue.isAllowReallocate
                && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div className={classes.orderLabel}>
                                Order status is
                                {' '}
                                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={formikAllocation.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Set as Allocating
                            </Button>
                        </div>
                    </div>
                )}

                {orderQueue.isAllowRecreate
                && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div>
                                Order status is
                                {' '}
                                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={formikNew.handleSubmit}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Set as New
                            </Button>
                        </div>
                    </div>
                ) }

                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${orderQueue.billing.firstname} ${orderQueue.billing.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {orderQueue.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {orderQueue.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{orderQueue.billing.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.billing.region}, 
                                ${orderQueue.billing.postcode}, ${orderQueue.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Address</h5>
                            <span className={classes.orderLabel}>{orderQueue.shipping.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.shipping.region},
                                ${orderQueue.shipping.postcode}, ${orderQueue.shipping.country_name}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Payment Method</h5>
                            <span className={classes.orderLabel}>{orderQueue.channelPaymentMethod}</span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Method</h5>
                            <span className={classes.orderLabel}>{orderQueue.channelShippingMethod}</span>
                        </div>
                    </div>
                    <br />
                    <div>
                        <h5 className={classes.titleSmall}>Items Ordered</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>SKU Product</th>
                                        <th className={classes.th}>Name</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>Price</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>Discount Amount</th>
                                        <th className={classes.th}>Location Code</th>
                                        <th className={classes.th}>Pickup At</th>
                                        {(aclCheckData && aclCheckData.isAccessAllowed) === true
                                            && <th className={classes.th}>Replacement For</th>}
                                    </tr>
                                    {orderQueue.orderItem.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(e.base_price)}</td>
                                            <td className={classes.td} style={{ textAlign: 'right' }}>{e.discount_amount}</td>
                                            <td className={classes.td}>{e.loc_code || '-'}</td>
                                            <td className={classes.td}>{e.pickup_name || '-'}</td>
                                            {(aclCheckData && aclCheckData.isAccessAllowed) === true
                                                && <td className={classes.td}>{e.replacement_for || '-'}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Shipping Cost</h5>
                            <span className={classes.dataSmallBlack}>{formatPriceNumber(orderQueue.shippingCost)}</span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Order Totals</h5>
                            <span className={classes.dataSmallBlack}>
                                Grand Total
                                {' '}
                                {formatPriceNumber(orderQueue.grandTotal)}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Notes for This Order</h5>
                            <span className={classes.dataSmallBlack}>{orderQueue.notes || '-'}</span>
                        </div>
                    </div>
                    {/* <div className={classes.gridTotal}>
                        <div className="grid-child" />
                        <div className="grid-child" />
                        <div className="grid-child" style={{ textAlign: 'right' }}>
                            <Button
                                className={classes.btn}
                                type="submit"
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Edit Order
                            </Button>
                        </div>
                    </div> */}
                </div>

            </Paper>
        </>
    );
};

export default OrderQueueEditContent;
