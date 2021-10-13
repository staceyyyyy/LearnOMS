/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/wavepack/pages/default/components/Header';
import useStyles from '@modules/wavepack/pages/default/components/style';
import Router from 'next/router';

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
    ];

    const optionsStatus = [
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
                        setTimeout(() => { setFilterValue(newValue && newValue.id); }, 500);
                    }}
                    options={optionsStatus}
                />
            ),
        },
        {
            field: 'status',
            name: 'status',
            type: 'in',
            label: 'Status',
            initialValue: ['pick_uncomplete', 'pick_complete'],
            hidden: true,
        },
    ];

    const getClassByStatus = (status) => {
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        if (status.value === 'pick_in_progress' || status.value === 'pack_in_progress') {
            return classes.orange;
        }
        return classes.gray;
    };

    const rows = PickByWaveList.map((wavelist) => ({
        ...wavelist,
        id: wavelist.entity_id,
        status: () => (
            <span className={getClassByStatus(wavelist.status)}>
                {wavelist.status.label}
            </span>
        ),
        started_at: () => (
            <span>
                {wavelist.started_at}
            </span>
        ),
    }));

    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getPickByWaveList}
                loading={loading}
                columns={columns}
                count={PickByWaveTotal}
                header={() => (
                    <Header />
                )}
                handleClickRow={(id) => Router.push(`/pickpack/wavepack/packlist/${id}`)}
            />
        </>
    );
};

export default PickByWaveListContent;
