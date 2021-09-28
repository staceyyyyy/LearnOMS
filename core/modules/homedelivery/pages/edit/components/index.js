/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import FormDialog from '@common_formdialog';
import gqlService from '@modules/homedelivery/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/edit/components/style';

const HomeDeliveryEditContent = (props) => {
    const {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
        formikNotes,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getShipmentCancelReason, getShipmentCancelReasonRes] = gqlService.getShipmentCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/homedelivery')}
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
                {`Home Delivery # ${homeDelivery.shipmentNumber}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{homeDelivery.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Order Date
                        </h5>
                        <span className="spanHeader">{homeDelivery.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Shipped From
                        </h5>
                        <span className="spanHeader">{homeDelivery.location}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>
                        {homeDelivery.statusLabel}
                    </h5>
                    <div className={classes.progressBar}>
                        <div className="step line">
                            <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'process_for_shipping') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />}
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'process_for_shipping') || (homeDelivery.statusValue === 'ready_for_pack') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />}
                        </div>
                        <div className="step line">
                            {(homeDelivery.statusValue === 'order_shipped') || (homeDelivery.statusValue === 'order_delivered')
                                || (homeDelivery.statusValue === 'closed') || (homeDelivery.statusValue === 'canceled') ? (
                                    <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                                ) : <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />}
                        </div>
                        <div className="step">
                            {!((homeDelivery.statusValue === 'order_delivered') || (homeDelivery.statusValue === 'closed')
                                || (homeDelivery.statusValue === 'canceled')) ? (
                                    <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                                ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />}
                        </div>
                    </div>
                    <hr />
                    <div className={classes.printProgress}>
                        {(homeDelivery.statusValue === 'process_for_shipping') && (
                            <>
                                Print your packlist, Pick your items
                                <br />
                                and pack your items
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pick/${homeDelivery.id}`)}
                                        variant="contained"
                                    >
                                        Print Pick List
                                    </Button>
                                    <br />
                                    {!(homeDelivery.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                            >
                                                Confirm Order
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikCantFullfill.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10 }}
                                            >
                                                Cannot Fullfill
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <FormDialog
                                                labelButton="Canceled"
                                                titleDialog="Cancel Reason"
                                                message={(
                                                    <>
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired)}>Cancel Reason</span>
                                                        <Autocomplete
                                                            className={clsx(classes.autocompleteRoot, 'popup')}
                                                            mode="lazy"
                                                            value={formikCanceled.values.reason}
                                                            onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                            loading={getShipmentCancelReasonRes.loading}
                                                            options={
                                                                getShipmentCancelReasonRes
                                                                && getShipmentCancelReasonRes.data
                                                                && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                            }
                                                            getOptions={getShipmentCancelReason}
                                                            error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                            helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                            primaryKey="value"
                                                            labelKey="label"
                                                        />
                                                        <div className={classes.formFieldButton}>
                                                            <Button
                                                                className={classes.btn}
                                                                onClick={formikCanceled.handleSubmit}
                                                                variant="contained"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10 }}
                                            >
                                                Mark Pick Complete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {(homeDelivery.statusValue === 'ready_for_pack') && (
                            <>
                                the packing order is ready to be processed
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pick/${homeDelivery.id}`)}
                                        variant="contained"
                                    >
                                        Print Pick List
                                    </Button>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pack/${homeDelivery.id}`)}
                                        variant="contained"
                                        style={{ marginLeft: 10 }}
                                    >
                                        Print Shipping Label
                                    </Button>
                                    <br />
                                    <Button
                                        className={classes.btn}
                                        onClick={formikPacked.handleSubmit}
                                        variant="contained"
                                    >
                                        Mark Pack Complete
                                    </Button>
                                </div>
                            </>
                        )}
                        {((homeDelivery.statusValue === 'ready_for_ship') || (homeDelivery.statusValue === 'shipment_booked')) && (
                            <>
                                {!(homeDelivery.statusValue === 'shipment_booked') && (
                                    <div className={classes.formFieldButton}>
                                        <Button
                                            className={classes.btn}
                                            onClick={formikCourier.handleSubmit}
                                            variant="contained"
                                        >
                                            Book Courier
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <span className={classes.spanText}>Or enter shipping and tracking information</span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={
                                            getCourierOptionRes
                                            && getCourierOptionRes.data
                                            && getCourierOptionRes.data.getCourierOption
                                        }
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'fieldCenter')}
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={formikShipped.values.name}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                        helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fieldRoot}
                                        label="AWB Number"
                                        variant="outlined"
                                        name="reference"
                                        value={formikShipped.values.reference}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                        helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.formFieldButton2}>
                                        <Button
                                            className={classes.btn}
                                            onClick={formikShipped.handleSubmit}
                                            variant="contained"
                                        >
                                            Shipped
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                        {(homeDelivery.statusValue === 'order_shipped') && (
                            <>
                                {(homeDelivery.awb) ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        AWB Number : -
                                    </span>
                                ) }
                                <div className={classes.formFieldButton2}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikDelivered.handleSubmit}
                                        variant="contained"
                                    >
                                        Mark as Delivered
                                    </Button>
                                </div>
                            </>
                        )}
                        {(homeDelivery.statusValue === 'order_delivered') && (
                            <>
                                {(homeDelivery.awb) ? (
                                    <span className={classes.orderLabel}>
                                        {`AWB Number : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel}>
                                        AWB Number : -
                                    </span>
                                )}
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`Delivered on : ${homeDelivery.updated} `}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${homeDelivery.firstname} ${homeDelivery.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {homeDelivery.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {homeDelivery.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{homeDelivery.street}</span>
                            <span className={classes.orderLabel}>{homeDelivery.city}</span>
                            <span className={classes.orderLabel}>
                                {`${homeDelivery.region}, ${homeDelivery.postcode}, ${homeDelivery.countryId}`}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>Items Ordered</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>SKU Product</th>
                                        <th className={classes.th}>Name</th>
                                        <th className={classes.th}>Unit Price</th>
                                        <th className={classes.th}>QTY</th>
                                        <th className={classes.th}>Subtotal</th>
                                    </tr>
                                    {homeDelivery.order.map((e) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                            <td className={classes.td}>{e.name}</td>
                                            <td className={classes.td}>{e.price}</td>
                                            <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty}</td>
                                            <td className={classes.td}>{e.row_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Status History</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>Date</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Notes</th>
                            </tr>
                            {homeDelivery.history.map((e) => (
                                <tr>
                                    <td className={classes.td} style={{ paddingLeft: 0 }}>{e.created_at}</td>
                                    <td className={classes.td}>{e.status}</td>
                                    <td className={classes.td}>{e.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Notes for this Shipment</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="notes"
                        value={formikNotes.values.notes}
                        onChange={formikNotes.handleChange}
                        error={!!(formikNotes.touched.notes && formikNotes.errors.notes)}
                        helperText={(formikNotes.touched.notes && formikNotes.errors.notes) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formikNotes.handleSubmit}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default HomeDeliveryEditContent;
