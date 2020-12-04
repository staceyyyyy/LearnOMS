/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import { optionsFramework, optionsRuleType } from '@modules/channel/helpers';
import Header from './Header';
import useStyles from './style';

const ChannelListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getChannelList, multideleteChannel } = props;
    const channelList = (data && data.getChannelList && data.getChannelList.items) || [];
    const channelTotal = (data && data.getChannelList && data.getChannelList.total_count) || 0;

    const columns = [
        { field: 'channel_id', headerName: 'No', enableSort: true, initialSort: 'ASC' },
        { field: 'channel_code', headerName: 'Channel Code', enableSort: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_name', headerName: 'Channel Name', enableSort: true, hideable: true },
        { field: 'channel_url', headerName: 'URL', enableSort: true, hideable: true },
        { field: 'token', headerName: 'Token', hideable: true },
        { field: 'framework', headerName: 'Framework' },
        { field: 'rule_type', headerName: 'Rule Type' },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'channel_id', name: 'channel_id_from', type: 'from', label: 'No From', initialValue: '12' },
        { field: 'channel_id', name: 'channel_id_to', type: 'to', label: 'No To', initialValue: '67' },
        { field: 'channel_code', name: 'channel_code', type: 'match', label: 'Channel Code', initialValue: '' },
        { field: 'channel_url', name: 'channel_url', type: 'match', label: 'Channel Url', initialValue: 'zz' },
        {
            field: 'framework',
            name: 'framework',
            type: 'in',
            label: 'Framework',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    multiple
                    value={(filterValue || []).map((option) => optionsFramework.find((e) => e.name === option))}
                    onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.name))}
                    options={optionsFramework}
                />
            ),
        },
        {
            field: 'ruleType',
            name: 'ruleType',
            type: 'eq',
            label: 'RuleType',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsRuleType.find((e) => e.name === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.name)}
                    options={optionsRuleType}
                />
            ),
        },
    ];

    const rows = channelList.map((channel) => ({
        ...channel,
        id: channel.channel_id,
        actions: () => (
            <Link href={`/oms/channel/edit/${channel.channel_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
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
                rows={rows}
                getRows={getChannelList}
                deleteRows={multideleteChannel}
                loading={loading}
                columns={columns}
                count={channelTotal}
                showCheckbox
            />
        </>
    );
};

export default ChannelListContent;
