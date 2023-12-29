import * as React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '@/components/common/table/dataTable';

interface PropTypes {
  data: any;
}

const DataMandatoriSPBE = ({ data }: PropTypes) => {
  const columns = [
    {
      id: 'id',
      label: 'No',
      width: 20,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'tahun',
      label: 'Tahun',
      width: 180,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'sasaran',
      label: 'Sasaran Kinerja',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'kebutuhan',
      label: 'Kebutuhan',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'uraian',
      label: 'Uraian',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'pengusul',
      label: 'Pengusul',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'opd',
      label: 'OPD',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'status',
      label: 'Status',
      width: 220,
      // flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
  ];

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default DataMandatoriSPBE;