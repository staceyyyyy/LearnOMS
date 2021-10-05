/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/wavelist/pages/list/components/Header';
import useStyles from '@modules/wavelist/pages/list/components/style';

const PickByWaveListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPickByWaveList } = props;
    const PickByWaveList = (data && data.getPickByWaveList && data.getPickByWaveList.items) || [];
    const PickByWaveTotal = (data && data.getPickByWaveList && data.getPickByWaveList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'Wave Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'started_at', headerName: 'Date', hideable: true },
        { field: 'picked_by', headerName: 'Picker', sortable: true, hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const optionsStatus = [
        { name: 'Pick in Progress', id: 'pick_in_progress' },
        { name: 'Pick Uncomplete', id: 'pick_uncomplete' },
        { name: 'Pick Complete', id: 'pick_complete' },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        setFilterValue(newValue && newValue.id);
                    }}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const getClassByStatus = (status) => {
        if (status.value === 'new') {
            return classes.green;
        }
        if (status.value === 'pick_in_progress' || status.value === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        return classes.grey;
    };

    const rows = PickByWaveList.map((wavelist) => ({
        ...wavelist,
        id: wavelist.entity_id,
        status: () => (
            <span className={getClassByStatus(wavelist.status)}>
                {wavelist.status.label}
            </span>
        ),
        started_at: () => {
            const today = new Date(wavelist.started_at);
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const todayString = `${mm}/${dd}/${yyyy}`;
            return (
                <span>
                    {todayString}
                </span>
            );
        },
        actions: () => (
            <Link href={`/pickpack/wavelist/picklist/${wavelist.entity_id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));
    return (
        <>
            <Header />
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getPickByWaveList}
                loading={loading}
                columns={columns}
                count={PickByWaveTotal}
            />
        </>
    );
};

export default PickByWaveListContent;
