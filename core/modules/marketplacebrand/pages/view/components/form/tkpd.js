import React from 'react';
import TextField from '@common_textfield';
import clsx from 'clsx';
import useStyles from '@modules/marketplacebrand/pages/view/components/style';

const FormContent = ({ formik }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>FS ID</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="fs_id"
                    value={formik.values.fs_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.fs_id && formik.errors.fs_id)}
                    helperText={(formik.touched.fs_id && formik.errors.fs_id) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Client Id</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="client_id"
                    value={formik.values.client_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.client_id && formik.errors.client_id)}
                    helperText={(formik.touched.client_id && formik.errors.client_id) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Client Secret</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="client_secret"
                    value={formik.values.client_secret}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.client_secret && formik.errors.client_secret)}
                    helperText={(formik.touched.client_secret && formik.errors.client_secret) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Shop Id</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="shop_id"
                    value={formik.values.shop_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.shop_id && formik.errors.shop_id)}
                    helperText={(formik.touched.shop_id && formik.errors.shop_id) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
        </>
    );
};

export default FormContent;
