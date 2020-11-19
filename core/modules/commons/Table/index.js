/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import MenuPopover from '@common_menupopover';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import TablePaginationActions from './components/TablePaginationActions';

const CustomTable = (props) => {
    const {
        showCheckbox = false,
        primaryKey = 'id',
        columns,
        rows,
        getRows,
        deleteRows,
        loading,
        initialPage = 0,
        initialRowsPerPage = 10,
        count,
    } = props;
    const [page, setPage] = React.useState(initialPage);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchRows = () => {
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
        };
        getRows({ variables });
    };

    React.useEffect(() => {
        fetchRows();
    }, [page, rowsPerPage]);

    const getComponentOrString = (param) => (
        typeof param === 'function' ? param() : param
    );

    const renderTableHeader = () => {
        const handleChangeCheckboxAllRows = (checked) => {
            const newCheckedRows = rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                } else if (!checked && i >= 0) {
                    return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
                }
                return accumulator;
            }, checkedRows);
            setCheckedRows(newCheckedRows);
            setIsCheckedAllRows(checked);
        };
        return (
            <TableHead>
                <TableRow>
                    {showCheckbox && (
                        <TableCell>
                            <Checkbox
                                checked={isCheckedAllRows}
                                onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                            />
                        </TableCell>
                    )}
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                        >
                            {getComponentOrString(column.headerName)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (checked && i < 0) {
                setCheckedRows([...checkedRows, row]);
            } else if (!checked && i >= 0) {
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {showCheckbox && (
                            <TableCell>
                                <Checkbox
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                />
                            </TableCell>
                        )}
                        {columns.map((column, columnIndex) => (
                            <TableCell
                                key={columnIndex}
                            >
                                {getComponentOrString(row[column.field])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
                {/* {loading && <div>Loading...</div>} */}
            </TableBody>
        );
    };

    const renderTableFooter = () => {
        return (
            <>
                <ConfirmDialog
                    open={openConfirmDialog}
                    onCancel={() => setOpenConfirmDialog(false)}
                    onConfirm={async () => {
                        // need imporvement later (after gql ready for deleteRows)
                        if (checkedRows && checkedRows.length) {
                            const variables = { [primaryKey]: checkedRows.map((checkedRow) => checkedRow[primaryKey]) };
                            await deleteRows({ variables });
                            fetchRows();
                        }
                        setOpenConfirmDialog(false);
                    }}
                    message="Are you sure you want to delete?"
                />
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            <MenuPopover
                                openButton={{ label: 'Actions' }}
                                menuItems={[
                                    { label: 'Delete', onClick: () => setOpenConfirmDialog(true) },
                                ]}
                            />
                        </TableCell>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                {renderTableHeader()}
                {renderTableBody()}
                {renderTableFooter()}
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
