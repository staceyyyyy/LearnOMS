/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/import/components/style';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const HomeDeliveryImport = (props) => {
    const {
        formik,
        handleDropFile,
        activityState,
        firstLoad,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/homedelivery')}
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
            <h2 className={classes.titleTop}>Bulk Shipment</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                    </div>
                    <div className={classes.formField}>
                        <DropFile
                            title="Please select the file : "
                            error={(
                                (formik.errors.binary && formik.touched.binary)
                            )}
                            getBase64={handleDropFile}
                        />
                    </div>

                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                        disabled={!formik.values.binary || (activityState && activityState.run_status === 'running') || firstLoad}
                    >
                        Submit
                    </Button>
                </div>
                {activityState && (activityState.run_status === 'running' || activityState.run_status === 'finished')
                    ? (
                        <div className={classes.progressContainer}>
                            <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                        </div>
                    )
                    : null}
                {firstLoad
                    ? (
                        <div className={classes.formFieldButton}>
                            <div className={clsx(classes.status)}>
                                Loading...
                            </div>
                        </div>
                    )
                    : (activityState && activityState.run_status && (
                        <div className={classes.formFieldButton}>
                            {activityState.run_status !== 'running'
                                ? activityState.error_message
                                    ? (
                                        <div className={clsx(classes.status, 'error')}>
                                            ERROR
                                        </div>
                                    )
                                    : (
                                        <div className={clsx(classes.status, 'success')}>
                                            SUCCESS
                                        </div>
                                    ) : null}

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>
                                                Status :
                                            </TableCell>
                                            <TableCell
                                                className={clsx(classes.rightColumn, 'capitalize')}
                                            >
                                                {activityState.run_status}

                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>
                                                Started At :
                                            </TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                {new Date(activityState.started_at).toLocaleString('en-US', {
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>
                                                Run By :
                                            </TableCell>
                                            <TableCell
                                                className={classes.rightColumn}
                                            >
                                                {activityState.run_by}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>
                                                Error Message :
                                            </TableCell>
                                            <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                {activityState.error_message || '-'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>
                                                Attachment :
                                            </TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                <a
                                                    onClick={() => (activityState.attachment
                                                        ? router.push(activityState.attachment) : null)}
                                                    style={{
                                                        color: '#BE1F93',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {activityState.attachment ? 'Download' : '-'}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                    )}
            </Paper>
        </>
    );
};

export default HomeDeliveryImport;
