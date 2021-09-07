/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/locationpriceupload/pages/import/components/style';

const LocationPriceUploadImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.titleTop}>Price Location Upload</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}><a href={urlDownload} className={classes.linkDownload}>Download the Sample CSV</a></span>
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
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default LocationPriceUploadImport;
