/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import useStyles from './style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Notification</h2>
        </div>
    );
};

export default HeaderContent;
