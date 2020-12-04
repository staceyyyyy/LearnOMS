/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import PropTypes from 'prop-types';

const defaultFilterComponent = ({ filterValue, setFilterValue }) => (
    <TextField
        variant="outlined"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
    />
);

const TableFilters = (props) => {
    const { initialFilters, setParentFilters } = props;

    // state
    const [filters, setFilters] = React.useState(initialFilters);
    const emptyFiltersField = filters && !filters.length;

    // methods
    const getFilterValueByField = (field) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        return index >= 0 ? filters[index].value : '';
    };
    const setFilterValueByField = (field, value) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        if (index >= 0) {
            setFilters(filters.map((filter) => ({
                ...filter,
                ...(filter.name === field.name && { ...field, value }),
            })));
        } else {
            setFilters([...filters, { ...field, value }]);
        }
    };

    return (
        <div style={{ padding: 12 }}>
            {emptyFiltersField && (
                <div style={{ padding: 12 }}>Filter fields is empty.</div>
            )}
            {filters.map((field, i) => (
                <div key={i} style={{ padding: 12, display: 'inline-block' }}>
                    <div>
                        {field.label}
                    </div>
                    {(field.component || defaultFilterComponent)({
                        get filterValue() { return getFilterValueByField(field); },
                        setFilterValue: (value) => setFilterValueByField(field, value),
                    })}
                </div>
            ))}
            <div style={{ padding: 12 }}>
                <Button
                    buttonType="primary-rounded"
                    onClick={() => {
                        // only set filters which have value
                        if (!emptyFiltersField) setParentFilters(filters);
                    }}
                >
                    Apply Filters
                </Button>
                <Button
                    buttonType="link"
                    onClick={() => {
                        if (!emptyFiltersField) {
                            const resetedFilters = filters.map((filter) => ({ ...filter, value: '' }));
                            setFilters(resetedFilters);
                            setParentFilters([]);
                        }
                    }}
                >
                    Clear Filters
                </Button>
            </div>
        </div>
    );
};

TableFilters.propTypes = {
    initialFilters: PropTypes.array,
};

TableFilters.defaultProps = {
    initialFilters: [],
};

export default TableFilters;
