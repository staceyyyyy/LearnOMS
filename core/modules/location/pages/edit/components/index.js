/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import companyGqlService from '@modules/company/services/graphql';
import useStyles from './style';

const LocationEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCompanyList, getCompanyListRes] = companyGqlService.getCompanyList();
    const optionsYesNo = [
        { id: 0, name: 'No' },
        { id: 1, name: 'Yes' },
    ];
    const optionsActive = [
        { id: 0, name: 'Inactive' },
        { id: 1, name: 'Active' },
    ];

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/location')}
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
            <h2 className={classes.titleTop}>Edit Location</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Company</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            value={formik.values.company}
                            onChange={(e) => formik.setFieldValue('company', e)}
                            loading={getCompanyListRes.loading}
                            options={
                                getCompanyListRes
                                && getCompanyListRes.data
                                && getCompanyListRes.data.getCompanyList
                                && getCompanyListRes.data.getCompanyList.items
                            }
                            getOptions={getCompanyList}
                            primaryKey="company_id"
                            labelKey="company_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Adress</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            helperText={(formik.touched.street && formik.errors.street) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Country</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="region"
                            value={formik.values.region}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.region && formik.errors.region)}
                            helperText={(formik.touched.region && formik.errors.region) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>City</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.city && formik.errors.city)}
                            helperText={(formik.touched.city && formik.errors.city) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Telephone</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Zip Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Longitude</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="longitude"
                            value={formik.values.longitude}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.longitude && formik.errors.longitude)}
                            helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Latitude</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="latitude"
                            value={formik.values.latitude}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.latitude && formik.errors.latitude)}
                            helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Zona</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="zone"
                            value={formik.values.zone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.zone && formik.errors.zone)}
                            helperText={(formik.touched.zone && formik.errors.zone) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Is Warehouse</span>
                        </div>
                        <Autocomplete
                            value={formik.values.warehouse}
                            onChange={(e) => formik.setFieldValue('warehouse', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.warehouse && formik.errors.warehouse)}
                            helperText={(formik.touched.warehouse && formik.errors.warehouse) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Use in Frontend</span>
                        </div>
                        <Autocomplete
                            value={formik.values.useFrontend}
                            onChange={(e) => formik.setFieldValue('useFrontend', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.useFrontend && formik.errors.useFrontend)}
                            helperText={(formik.touched.useFrontend && formik.errors.useFrontend) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Is Sirclo Warehouse</span>
                        </div>
                        <Autocomplete
                            value={formik.values.sircloWarehouse}
                            onChange={(e) => formik.setFieldValue('sircloWarehouse', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.sircloWarehouse && formik.errors.sircloWarehouse)}
                            helperText={(formik.touched.sircloWarehouse && formik.errors.sircloWarehouse) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Is Virtual Location</span>
                        </div>
                        <Autocomplete
                            value={formik.values.virtualLocation}
                            onChange={(e) => formik.setFieldValue('virtualLocation', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.virtualLocation && formik.errors.virtualLocation)}
                            helperText={(formik.touched.virtualLocation && formik.errors.virtualLocation) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Priority</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="priority"
                            value={formik.values.priority}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.priority && formik.errors.priority)}
                            helperText={(formik.touched.priority && formik.errors.priority) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Status</span>
                        </div>
                        <Autocomplete
                            value={formik.values.status}
                            onChange={(e) => formik.setFieldValue('status', e)}
                            options={optionsActive}
                            error={!!(formik.touched.status && formik.errors.status)}
                            helperText={(formik.touched.status && formik.errors.status) || ''}
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

export default LocationEditContent;
