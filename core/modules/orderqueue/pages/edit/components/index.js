/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/orderqueue/pages/edit/components/style';
import clsx from 'clsx';
import { formatPriceNumber } from '@helper_currency';
import { Formik, FieldArray } from 'formik';
import ModalFindProduct from '@modules/orderqueue/pages/edit/components/modalFindProduct';
import Item from '@modules/orderqueue/pages/edit/components/Item';
import ConfirmDialog from '@common_confirmdialog';
import gqlService from '@modules/orderqueue/services/graphql';

const OrderQueueEditContent = (props) => {
    const {
 formikAllocation, formikNew, orderQueue, parent, aclCheckData, initialValueEditItem, handleSubmitEdit, handleCancel,
} = props;
    const classes = useStyles();
    const router = useRouter();
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

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

    const [isModeEdit, setIsModeEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idxOpendModal, setIdxOpendModal] = useState(null);

    const handleOpenModal = (idx) => {
        setIdxOpendModal(idx);
        setIsModalOpen(true);
    };

    const defaultConfirmDialog = {
        title: 'Cancel Order',
        message: 'Are you sure want to cancel this order?',
        onConfirm: async () => {
            await handleCancel();
        },
    };

    const [confirmDialogState, setConfirmDialogState] = useState(defaultConfirmDialog);

    const [getHistoryOrderItemList, getHistoryOrderItemListRes] = gqlService.getHistoryOrderItemList();

    useEffect(() => {
        getHistoryOrderItemList({
            variables: {
                oms_order_id: orderQueue.id,
            },
        });
    }, []);

    const historyOrderItemList = getHistoryOrderItemListRes?.data?.getHistoryOrderItemList ?? [];

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(parent ? `/order/${parent}` : '/order/allorder')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{`Detail Order #${orderQueue.id}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(orderQueue.status)}>{orderQueue.status}</div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={iconFilter(orderQueue.channelCode)}
                                alt=""
                                className="iconHeader"
                                onError={(event) => (event.target.style.display = 'none')}
                            />
                            {orderQueue.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Number</h5>
                        <span className="spanHeader">{orderQueue.channelOrderId}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Channel Order Date</h5>
                        <span className="spanHeader">{orderQueue.createdAt}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Last Update</h5>
                        <span className="spanHeader">{orderQueue.lastUpdated}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">Acceptance Deadline</h5>
                        <span className="spanHeader">{orderQueue.acceptanceDeadline}</span>
                    </div>
                </div>

                {orderQueue.isAllowReallocate && (
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
                            <Button
                                className={clsx(classes.btn, 'btn-cancel')}
                                type="submit"
                                onClick={() => setOpenConfirmDialog(true)}
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {orderQueue.isAllowRecreate && (
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
                )}

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
                    <div style={{ width: '100%' }}>
                        <div>
                            <div>
                                <h5 className={classes.titleSmall}>Items Ordered</h5>
                            </div>
                        </div>
                        <Formik initialValues={initialValueEditItem}>
                            {({
 values, setFieldValue, setValues, touched, errors,
}) => (
                                <>
                                    <ModalFindProduct
                                        open={isModalOpen}
                                        handleClose={() => setIsModalOpen(false)}
                                        idx={idxOpendModal}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                    />
                                    <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                                        <table className={classes.table}>
                                            <tbody>
                                                <tr className={classes.tr}>
                                                    <th className={classes.th} style={{ paddingLeft: 0 }}>
                                                        SKU Product
                                                    </th>
                                                    <th className={classes.th}>Name</th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Price
                                                    </th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Qty
                                                    </th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        Discount Amount
                                                    </th>
                                                    <th className={classes.th}>Location Code</th>
                                                    <th className={classes.th}>Pickup At</th>
                                                </tr>
                                                <FieldArray name="order_items">
                                                    {({ remove }) => (
                                                        <>
                                                            {values.order_items.map((e, idx) => (
                                                                <Item
                                                                    channelCode={orderQueue.channelCode}
                                                                    key={e?.id}
                                                                    idx={idx}
                                                                    aclCheckData={aclCheckData}
                                                                    classes={classes}
                                                                    setFieldValue={setFieldValue}
                                                                    remove={remove}
                                                                    isModeEdit={isModeEdit}
                                                                    item={e}
                                                                    values={values}
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    handleOpenModal={handleOpenModal}
                                                                />
                                                            ))}
                                                        </>
                                                    )}
                                                </FieldArray>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'end',
                                            alignItems: 'center',
                                            margin: '15px 0',
                                        }}
                                    >
                                        {aclCheckData && aclCheckData.isAccessAllowed && orderQueue.isAllowReallocate && (
                                            <>
                                                <div>
                                                    <Button
                                                        style={{ height: '30px' }}
                                                        className={classes.btn}
                                                        onClick={() => {
                                                            if (isModeEdit) {
                                                                setConfirmDialogState({
                                                                    title: 'Confirmation',
                                                                    message:
                                                                        'There will be no salable stock checking for edited items. Are you sure you want to edit the order item?',
                                                                    onConfirm: async () => {
                                                                        await handleSubmitEdit(values);
                                                                    },
                                                                });
                                                                setOpenConfirmDialog(true);
                                                                return;
                                                            }
                                                            setConfirmDialogState(defaultConfirmDialog);
                                                            setIsModeEdit(true);
                                                        }}
                                                    >
                                                        {isModeEdit ? 'Save' : 'Edit Order'}
                                                    </Button>
                                                </div>
                                                {isModeEdit && (
                                                    <div style={{ margin: '15px 15px 0px 15px' }}>
                                                        <button
                                                            type="button"
                                                            className={`link-button ${classes.btnClear}`}
                                                            onClick={() => {
                                                                setConfirmDialogState(defaultConfirmDialog);
                                                                setFieldValue('deleted_items', []);
                                                                setValues(initialValueEditItem);
                                                                setIsModeEdit(false);
                                                            }}
                                                        >
                                                            cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Order Totals</h5>
                            <div>
                                <div className={classes.orderTotalContainer}>
                                    <div className={classes.orderTotalItem}>Shipping Cost</div>
                                    <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                        {formatPriceNumber(orderQueue.shippingCost)}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.orderTotalContainer}>
                                    <div className={classes.orderTotalItem}>Grand Total</div>
                                    <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                        {formatPriceNumber(orderQueue.grandTotal)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>Notes for This Order</h5>
                            <span className={classes.dataSmallBlack}>{orderQueue.notes || '-'}</span>
                        </div>
                    </div>
                </div>
                {historyOrderItemList?.length > 0 && (
                    <div className={classes.content} style={{ marginBottom: '20px' }}>
                        <div>
                            <h5 className={classes.titleSmall}>Edit History</h5>
                        </div>
                        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                            <table className={classes.table}>
                                <thead>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            Date
                                        </th>
                                        <th className={classes.th}>User</th>
                                        <th className={classes.th}>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyOrderItemList.map((e) => (
                                        <tr key={e?.id}>
                                            <td className={classes.td} style={{ paddingLeft: 0, padding: '10px 0px', verticalAlign: 'top' }}>
                                                {e?.created_at}
                                            </td>
                                            <td className={classes.td} style={{ verticalAlign: 'top', padding: '10px 0px' }}>
                                                {e?.created_by_name}
                                            </td>
                                            <td className={classes.td} style={{ verticalAlign: 'top', padding: '10px 0px' }}>
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    {e?.comment?.map((elm, i) => (
                                                        <li key={i}>{elm}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Paper>

            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => {
                    setOpenConfirmDialog(false);
                    setTimeout(() => setConfirmDialogState(defaultConfirmDialog), 200);
                }}
                onConfirm={async () => {
                    await confirmDialogState.onConfirm();
                    setOpenConfirmDialog(false);
                    setTimeout(() => setConfirmDialogState(defaultConfirmDialog), 200);
                }}
                title={confirmDialogState.title}
                message={confirmDialogState.message}
            />
        </>
    );
};

export default OrderQueueEditContent;
