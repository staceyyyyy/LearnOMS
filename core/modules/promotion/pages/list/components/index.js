/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import useStyles from '@modules/promotion/pages/list/components/style';
import Header from '@modules/promotion/pages/list/components/Header';

const ManageRmaListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPromotionList, updateStatusPromotion,
        massDeletePromotion, exportPromotion } = props;

    const promotionList = (data && data.getPromotionList && data.getPromotionList.items) || [];
    const promotionTotal = (data && data.getPromotionList && data.getPromotionList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true },
        { field: 'from_date', headerName: 'From Date', hideable: true, sortable: true },
        { field: 'to_date', headerName: 'To Date', hideable: true, sortable: true },
        { field: 'type', headerName: 'Type', hideable: true },
        { field: 'name', headerName: 'Name', hideable: true },
        { field: 'status', headerName: 'Status', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'type', name: 'type', type: 'like', label: 'Type', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = [{ name: 'Enabled', id: 'enabled' }, { name: 'Disabled', id: 'disabled' }];
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            },
        },
    ];

    const isPromotionEnd = (date) => {
        if (new Date(date) < new Date()) {
            return true;
        }
        return false;
    };

    const rows = promotionList.map((promotion) => ({
        ...promotion,
        from_date: <span className={isPromotionEnd(promotion.to_date) ? classes.red : classes.green}>{promotion.from_date}</span>,
        to_date: <span className={isPromotionEnd(promotion.to_date) ? classes.red : classes.green}>{promotion.to_date}</span>,
        actions: () => (
            <Link href={`/marketing/promotion/detail/${promotion.id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: 'Enable Promotion',
            message: 'Are you sure to confirm ?',
            onClick: (checkedRows) => {
                const variables = checkedRows.map((checkedRow) => ({ id: Number(checkedRow.id), status: 1 }));
                updateStatusPromotion({ variables: { data: variables } });
            },
            showMessage: true,
        },
        {
            label: 'Disable Promotion',
            message: 'Are you ready for pack?',
            onClick: (checkedRows) => {
                const variables = checkedRows.map((checkedRow) => ({ id: Number(checkedRow.id), status: 0 }));
                updateStatusPromotion({ variables: { data: variables } });
            },
            showMessage: true,
        },
        {
            label: 'Delete Promotion',
            message: 'Are you sure to picked up this order?',
            onClick: (checkedRows) => {
                const id = checkedRows.map((checkedRow) => checkedRow.id);
                massDeletePromotion({ variables: { id } });
            },
            showMessage: true,
        },
        {
            label: 'Export Promotion',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const id = checkedRows.map((checkedRow) => checkedRow.id);
                exportPromotion({ variables: { id } });
            },
        },
    ];

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getPromotionList}
                loading={loading}
                columns={columns}
                count={promotionTotal}
                actions={actions}
                showCheckbox
            />
        </>
    );
};

export default ManageRmaListContent;
