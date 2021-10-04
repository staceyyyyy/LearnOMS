/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/company/pages/list/components/Header';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'company_code', headerName: 'Company Code', sortable: true, hideable: true },
        { field: 'company_name', headerName: 'Company Name', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'company_id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'company_id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'company_code', name: 'company_code', type: 'like', label: 'Company Code', initialValue: '' },
        { field: 'company_name', name: 'company_name', type: 'like', label: 'Company Name', initialValue: '' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/oms/company/edit/${company.company_id}`}>
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
                getRows={getCompanyList}
                deleteRows={multideleteCompany}
                loading={loading}
                columns={columns}
                count={companyTotal}
                showCheckbox
            />
        </>
    );
};

export default CompanyListContent;
