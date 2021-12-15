import Header from '@modules/stocksummary/pages/list/components/Header';
import React from 'react';
import Table from '@common_table';
import useStyles from '@modules/stocksummary/pages/list/components/style';

const StockSummaryList = (props) => {
    const classes = useStyles();
    const { data, loading, getStockSummaryList } = props;
    const stockSummaryList = (data && data.getStockSummaryList && data.getStockSummaryList.items) || [];
    const stockSummaryTotal = (data && data.getStockSummaryList && data.getStockSummaryList.total_count) || 0;

    const columns = [
        {
            field: 'sku',
            headerName: 'SKU',
            hideable: 'true',
            sortable: true,
            initialSort: 'ASC',
        },
        {
            field: 'product_name',
            headerName: 'Name',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'channel_name',
            headerName: 'Channel',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'channel_stock',
            headerName: 'Stock',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'sync_status_label',
            headerName: 'Sync Status',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'sync_message',
            headerName: 'Sync Message',
            hideable: 'true',
            sortable: true,
        },
    ];

    const filters = [
        {
            field: 'sku',
            name: 'sku',
            type: 'like',
            label: 'SKU',
            initialValue: '',
        },
        {
            field: 'product_name',
            name: 'product_name',
            type: 'like',
            label: 'Name',
            initialValue: '',
        },
        {
            field: 'channel_name',
            name: 'channel_name',
            type: 'like',
            label: 'Channel',
            initialValue: '',
        },
        {
            field: 'sync_status',
            name: 'sync_status',
            type: 'like',
            label: 'Sync Status',
            initialValue: '',
        },
        {
            field: 'sync_message',
            name: 'sync_message',
            type: 'like',
            label: 'Sync Message',
            initialValue: '',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
        case 'pending':
            return classes.statusProcessing;
        case 'success':
            return classes.statusSuccess;
        case 'failed':
            return classes.statusFailed;
        default:
            return classes.statusClosed;
        }
    };

    const rows = stockSummaryList.map((stockSummary) => ({
        ...stockSummary,
        id: stockSummary.entity_id,
        sync_status_label: <div className={getStatusColor(stockSummary.sync_status)}>{stockSummary.sync_status_label ?? 'Unknown'}</div>,
    }));

    return (
        <>
            <Header />
            <Table
                hideActions
                filters={filters}
                rows={rows}
                getRows={getStockSummaryList}
                loading={loading}
                columns={columns}
                count={stockSummaryTotal}
            />
        </>
    );
};

export default StockSummaryList;
