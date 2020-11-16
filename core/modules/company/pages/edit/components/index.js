/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from './style';

const CompanyEditContent = (props) => {
    const {
        code,
        setCode,
        name,
        setName,
        handleSubmit,
    } = props;
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.title}>Edit Company</h2>
            <Paper className={classes.container}>
                <div className={classes.formField}>
                    <TextField
                        variant="outlined"
                        name="code"
                        label="Company Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className={classes.formField}>
                    <TextField
                        variant="outlined"
                        name="name"
                        label="Company Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={classes.formField}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Save
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CompanyEditContent;
