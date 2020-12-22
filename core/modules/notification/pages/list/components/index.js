/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from './Header';
import useStyles from './style';

const NotificationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getNotificationList, multiReadNotification } = props;
    const notificationList = (data && data.getNotificationList && data.getNotificationList.items) || [];
    const notificationTotal = (data && data.getNotificationList && data.getNotificationList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'created_at', headerName: 'Created At', sortable: true },
        { field: 'entity_type', headerName: 'Type', sortable: true },
        { field: 'status', headerName: 'Status', sortable: true },
        { field: 'message', headerName: 'Messages', sortable: true },
        { field: 'attachment', headerName: 'Attachment' },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '1' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '30' },
        { field: 'entity_type', name: 'entity_type', type: 'like', label: 'Type', initialValue: '' },
        { field: 'message', name: 'message', type: 'like', label: 'Messages', initialValue: '' },
    ];

    const actions = [
        {
            label: 'Mark as Read',
            message: 'Are you sure you want to continue?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await multiReadNotification({ variables });
            },
        },
    ];

    const rows = notificationList.map((notification) => ({
        ...notification,
        id: notification.id,
    }));

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getNotificationList}
                loading={loading}
                columns={columns}
                count={notificationTotal}
                showCheckbox
            />
        </>
    );
};

export default NotificationListContent;
